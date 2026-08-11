# 모노레포 루트에서 빌드한다:
#   docker build -f apps/admin/Dockerfile -t purut-admin .
#
# NEXT_PUBLIC_* 는 빌드 시점에 번들에 박힌다. 런타임 환경변수로는 안 바뀌므로
# 빌드 인자로 받는다.

FROM node:22-alpine AS deps
WORKDIR /app
# 워크스페이스 매니페스트만 먼저 넣어 의존성 레이어를 캐시한다
COPY package.json package-lock.json ./
COPY apps/admin/package.json apps/admin/
COPY apps/mobile/package.json apps/mobile/
RUN npm ci --workspace=admin --include-workspace-root

FROM node:22-alpine AS build
WORKDIR /app
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules node_modules
COPY --from=deps /app/apps/admin/node_modules apps/admin/node_modules
COPY package.json package-lock.json ./
COPY apps/admin apps/admin
RUN npm run build --workspace=admin

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
# standalone 서버는 HOSTNAME 에 바인딩하는데 Docker 가 이걸 컨테이너 ID 로
# 채워버린다. 그러면 컨테이너 안에서도 localhost:3000 으로 못 붙어서
# 헬스체크와 Caddy 프록시가 모두 실패한다
ENV HOSTNAME=0.0.0.0

RUN addgroup -S app && adduser -S app -G app

# standalone 은 서버 실행에 필요한 것만 담고 있다. static 과 public 은 따로 옮겨야 한다
COPY --from=build --chown=app:app /app/apps/admin/.next/standalone ./
COPY --from=build --chown=app:app /app/apps/admin/.next/static ./apps/admin/.next/static
COPY --from=build --chown=app:app /app/apps/admin/public ./apps/admin/public

USER app
EXPOSE 3000

# localhost 를 쓰면 alpine 이 ::1 로 먼저 풀어서 실패한다 — 서버는 0.0.0.0(IPv4)에만 붙는다
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
    CMD wget -qO- http://127.0.0.1:3000/legal/privacy > /dev/null || exit 1

CMD ["node", "apps/admin/server.js"]
