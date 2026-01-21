# Legacy AMD → ESM 전환 및 Next.js Micro Frontend 구조 샘플

## 한 줄 요약

require.js(AMD) 기반 Backbone 레거시 애플리케이션을  
ESM 기반으로 전환하고,  
Next.js(App Router) 플랫폼 내부에서  
`/legacy` prefix 기반 Micro Frontend 구조로 공존 가능하게 구성한 샘플입니다.

---

## 1. 목적

본 프로젝트는 **실제 서비스 코드를 담고 있지는 않습니다.**,  
다음과 같은 **구조적 선택이 가능한지 검증하기 위한 샘플**입니다.

- AMD 기반 레거시 애플리케이션의 ESM 전환 가능성
- Next.js(App Router)와 레거시 애플리케이션의 공존 구조
- Module Federation 없이도 가능한 Micro Frontend 형태의 통합
- 레거시 코드 수정 최소화 전략

---

## 2. 전제 조건

- Backbone 기반 레거시 애플리케이션 유지
- 레거시 라우팅 로직 유지
- 레거시 실행 컨텍스트 유지
- 신규 플랫폼은 Next.js(App Router) 기반
- 두 애플리케이션은 **같은 페이지에서 공존**하되 **책임은 분리**

---

## 3. 핵심 설계 결정

### 3-1. AMD(require.js) → ESM 전환

#### 문제 정의

- require.js 기반 AMD 구조는 런타임 의존성 해석 방식
- Next.js 및 ESM 번들링 모델과 구조적으로 비호환
- Backbone 로직 자체가 아니라 **로딩 모델이 문제**

#### 선택한 접근

- 레거시 로직은 그대로 유지
- require.js 런타임 제거
- 빌드 타임에 AMD 모듈을 ESM으로 변환
- 단일 ESM 엔트리(`app.js`) 생성

#### 결과

- 브라우저 런타임에서 require.js 제거
- ESM 스크립트 하나로 레거시 애플리케이션 로딩
- 기존 Backbone 동작 유지

---

### 3-2. Prefix 기반 Micro Frontend 구조

#### 라우팅 분리

- `/` : Next.js 플랫폼 영역
- `/legacy/**` : Backbone 레거시 영역

#### 설계 원칙

- Next.js는 레거시 라우터를 인지하지 않음
- `/legacy` 진입 시 레거시 애플리케이션에 위임
- Next.js는 컨테이너 역할만 수행

#### 구조적 효과

- 라우팅 충돌 제거
- 두 애플리케이션의 사고 모델 분리
- 점진적 마이그레이션을 위한 명확한 경계 형성

---

### 3-3. Script + Mount / Unmount 패턴

#### 선택한 방식

- 레거시 번들을 `public/legacy/app.js`에 위치
- `<script type="module">`로 동적 로딩
- 로딩 완료 시 `mount(container)` 호출
- 페이지 이탈 시 `unmount()` 호출

#### 의도

- Next.js와 레거시의 생명주기 분리
- 레거시 애플리케이션을 독립된 실행 단위로 취급
- App Router 환경에서 예측 가능한 동작 확보

---

### 3-4. Module Federation 미사용 배경

Module Federation은 React 기반 MFE의 일반적인 선택지이나,  
본 구조에서는 다음 이유로 적합하지 않았습니다.

- ESM 전환 이후에도 외부 서드파티 라이브러리가 전역 실행 및 초기 Side-Effect 를 전제로 동작
- Module Federation의 번들 공유 모델과 직접적인 구조 불일치 존재
- 레거시 수정 최소화 및 점진적 전환 목표에 비추어 script 기반 위임 구조 선택
- 향후 레거시 의존성 정리 시 Module Federation 확장 가능성은 열어둠

따라서
**스크립트 로딩 기반 위임 구조**를 선택했습니다.

---

## 4. 프로젝트 구조

```txt
/
├─ apps/
│  ├─ legacy/      # 단독 실행 가능한 Backbone 기반 레거시 애플리케이션
│  └─ platform/    # Next.js(App Router) 기반 신규 플랫폼
│
├─ packages/
│  ├─ store/       # 공용 상태 관리 모듈
│  └─ ui-react/    # 공용 React 컴포넌트
│
└─ README.md
```
