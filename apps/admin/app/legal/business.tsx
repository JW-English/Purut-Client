/**
 * 사업자 정보. 약관과 개인정보처리방침이 같은 값을 쓴다.
 *
 * 아직 정해지지 않은 값은 빈 문자열로 두고 <Placeholder> 가 화면에 눈에 띄게 표시한다.
 * 스토어 심사에서 심사자가 이 URL 을 직접 열어보므로, 채워지지 않은 채로 제출하면
 * 반려 사유가 된다. 빌드 시점에 강제로 막지는 않는다 — 개발 중에 페이지가 안 뜨면
 * 오히려 확인이 어렵다.
 */
export const BUSINESS = {
  name: '',             // 상호 (예: 푸릇푸릇영어)
  representative: '',   // 대표자 성명
  registration: '',     // 사업자등록번호
  address: '',          // 사업장 주소
  email: '',            // 문의 이메일
  privacyOfficer: '',   // 개인정보 보호책임자 성명
} as const;

export const EFFECTIVE_DATE = '2026년 0월 0일';

export function Placeholder({ v }: { v: string }) {
  if (v) return <>{v}</>;
  return (
    <mark className="rounded bg-amber-200 px-1 font-medium text-amber-900">
      [입력 필요]
    </mark>
  );
}
