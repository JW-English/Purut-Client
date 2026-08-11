/**
 * 약관·개인정보처리방침 공통 레이아웃.
 *
 * (dashboard) 그룹 밖에 두어 로그인 없이 열린다. App Store·Play Console 이
 * 심사에서 이 URL 을 직접 열어보므로 인증이 걸리면 반려된다.
 */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <article
        className="
          prose-neutral text-[15px] leading-relaxed text-neutral-800
          [&_h1]:mb-2 [&_h1]:text-2xl [&_h1]:font-bold
          [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-semibold
          [&_p]:my-3
          [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1
          [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm
          [&_th]:border [&_th]:border-neutral-300 [&_th]:bg-neutral-100 [&_th]:p-2 [&_th]:text-left
          [&_td]:border [&_td]:border-neutral-300 [&_td]:p-2 [&_td]:align-top
        ">
        {children}
      </article>

      <footer className="mt-14 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
        <a href="/legal/terms" className="underline">
          이용약관
        </a>
        <span className="mx-2">·</span>
        <a href="/legal/privacy" className="underline">
          개인정보처리방침
        </a>
      </footer>
    </main>
  );
}
