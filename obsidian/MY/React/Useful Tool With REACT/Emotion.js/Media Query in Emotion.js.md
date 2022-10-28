
emotion.js에서는 media query를 약간 편리하게 사용할 수 있다. breakpoint를 미리 설정해두고, map을 돌려 media query를 설정할 수 있다.

```javascript

const breakpoints = [768, 1200];
const mQ = breakpoints.map(bp => `@media screen and (max-width:${bp}px)`)

const Container = styled.div`
	${mQ[0]} {
		width: 100%;
	}
`;

```

위와 같이 작성하면 Container 컴포넌트에 @media screen and (max-width:768px)의 미디어 쿼리가 적용된다.