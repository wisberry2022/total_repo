import './Third.scss';

const SubTemplate = ({ subData }) => {
  return (
    <div>
      <ul className="sub_desc">
        {subData.map(it => {
          return (
            <li key={it.id}>
              <strong>{it.title}</strong>
              {typeof it.contents === 'object' ?
                <ul className="tech_list">
                  {it.contents.map((it, idx) => {
                    return (
                      <li key={idx}>
                        <figure className={`bg_set itm0${idx + 1}`}></figure>
                        <span>{it}</span>
                      </li>
                    )
                  })}
                </ul>
                : <span>{it.contents}</span>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const InfoTemplate = ({ data }) => {
  return (
    <div className="desc">
      <h5>{data.title}</h5>
      <div className="sub_info">
        <strong>프로젝트 소개</strong>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia minus necessitatibus aliquam id. Ducimus, soluta sit, ipsa at, voluptatem adipisci facere velit expedita voluptatibus qui odio. Quam natus repudiandae deserunt?
        </p>
      </div>
      <SubTemplate subData={data.subData} />
    </div>
  )
}

const Third = () => {
  const dataList = [
    {
      id: 1, title: '부산교통공사 홈페이지 제작', intro: '', subData: [
        { id: 1, title: '배포/링크', contents: 'HEROKU' },
        { id: 2, title: '사용API', contents: '부산교통공사 API' },
        { id: 3, title: '사용기술', contents: ['react', 'ExpressJS', 'axios', 'SCSS'] },
      ]
    },
    {
      id: 2, title: 'CGV 홈페이지 제작', intro: '', subData: [
        { id: 1, title: '배포/링크', contents: 'HEROKU' },
        { id: 2, title: '사용API', contents: 'KOBIS / 네이버 검색 API(영화)' },
        { id: 3, title: '사용기술', contents: ['react', 'ExpressJS', 'axios', 'react-redux', 'SCSS'] },
      ]
    },
  ];
  return (
    <div className="section bg_set third">
      <div className="container">
        <div className="top">
          <div className="title_box">
            <h4 className="div_title">SIDE PROJECT (REACT)</h4>
          </div>
          <div className="info_desc">
            <div className="left">
              <InfoTemplate data={dataList[0]} />
            </div>
            <div className="right">
              <InfoTemplate data={dataList[1]} />
            </div>
          </div>

        </div>
        <div className="bottom">
          bye
        </div>
      </div>
    </div>
  )
}

export default Third;