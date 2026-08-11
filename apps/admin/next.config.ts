import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 컨테이너에 필요한 파일만 추려 .next/standalone 에 모은다.
  // node_modules 통째로 넣으면 이미지가 수백 MB 가 되는데, VM 이 2GB 다.
  output: "standalone",

  // 모노레포라 워크스페이스 루트를 알려줘야 standalone 이 의존성을 제대로 추린다
  outputFileTracingRoot: new URL("../../", import.meta.url).pathname,
};

export default nextConfig;
