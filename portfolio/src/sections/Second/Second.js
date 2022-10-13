import './Second.scss';

const PhaseTemplate = ({ data }) => {
  return (
    <div className="phase">
      <h5>
        {data.title}
      </h5>
      {data.icon ?
        <ul className="icon_list">
          {data.list.map((it, idx) => {
            return (
              <li key={idx}>
                <figure className={`bg_set itm0${idx + 1}`}></figure>
                <span>{it}</span>
              </li>
            )
          })}
        </ul>
        :
        <ul>
          {data.list.map((it, idx) => {
            return (
              <li key={idx}>
                {it}
              </li>
            )
          })}
        </ul>
      }
    </div>
  )
}

const Second = () => {
  const descList = [
    { id: 1, title: '배포/링크', icon: false, list: ['HEROKU'] },
    { id: 2, title: '구현중점', icon: false, list: ['CRUD 구현', '로그인/로그아웃 상태유지'] },
    { id: 3, title: '사용기술', icon: true, list: ['react', 'redux-toolkit', 'redux-persist', 'mongoDB', 'scss'] },
  ];
  return (
    <div className="section bg_set second">
      <div className="container">
        <div className="left">
          <div className="title_box">
            <h4 className="div_title">MAIN PROJECT (REACT)</h4>
          </div>
          <div className="info_desc">
            <div className="main_info">
              <h5>정토회 홈페이지 제작</h5>
              <strong>프로젝트 소개</strong>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quas provident repudiandae. Corporis libero ullam distinctio non tenetur itaque iusto ducimus. Est ad, eum animi nobis non, tempora eveniet impedit excepturi numquam esse vero, architecto sequi. Alias, repellat quisquam optio facilis fuga minima distinctio reiciendis praesentium quibusdam, accusamus, maxime provident.
              </p>
            </div>
            <div className="sub_info">
              {descList.map((it, idx) => {
                return (
                  <PhaseTemplate key={idx} data={it} />
                )
              })}
            </div>
          </div>
        </div>
        <div className="right">
          <h4 className="div_title">DEMONSTRATION</h4>
          <figure className="movie"></figure>
        </div>
      </div>
    </div>
  )
}

export default Second;