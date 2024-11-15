# 마플개발대학 (수요코딩회) 내용 정리

## 주요 기능 및 구현사항

### 1. View 시스템 구현

- 추상 클래스 `View<T>`를 통한 템플릿 렌더링 시스템
- HTML 템플릿 문자열 생성 및 렌더링
- 제네릭을 활용한 타입 안정성 보장
- 이벤트 위임을 통한 효율적인 이벤트 처리

### 2. 동시성 처리

- Generator를 활용한 chunk 단위 처리
- Promise 기반의 비동기 처리
- 세 가지 구현 방식 제공:
  - `concurrent1`: Promise.all을 활용한 기본 구현
  - `concurrent2`: Generator와 비동기 이터레이터 활용
  - `concurrent3`: FxIterator를 이용한 함수형 구현

### 3. 볼 렌더링 뷰

- `BallView` 클래스: 개별 볼의 렌더링 및 애니메이션 처리
- `BallsView` 클래스: 여러 볼의 렌더링 및 추가/삭제 기능 구현

### 프로젝트 구조

src/ <br/>
├── view.ts # 기본 View 추상 클래스 및 이벤트 위임 <br/>
├── template.ts # HTML 템플릿 처리 <br/>
├── helper.ts # 유틸리티 함수 <br/>
├── users.ts # 사용자 관리 뷰 <br/>
├── balls.ts # 볼 렌더링 뷰 <br/>
└── concurrent.ts # 동시성 처리 구현 <br/>
