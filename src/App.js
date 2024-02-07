import './App.css';
import { useState } from 'react';

function Header(props){
  console.log('props', props, props.title);
  return <header>
    <h1><a href="/" onClick={(event)=>{               //function(event){} = (event)=>{}
      event.preventDefault(); //click해도 reload가 되지 않는다
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props){
  const lis = [
  ]
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));  //여기서 target은 'id'를 가리킴,   Number() => 문자를 숫자로 컨버팅 해줌
      }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  // const _mode = useState('WELCOME');
  // const mode = _mode[0];
  // const setMode = _mode[1];  --> 이것을 간단하게 한줄로 요약한게 밑에 작성한 코드이다.
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);

  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
  ]
  
  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  }else if(mode === 'READ'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      console.log(topics[i].id, id); //디버깅할때 console.log를 사용한다
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        //mode = 'WELCOME';
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        //mode = 'READ';
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
    </div>
  );
}

export default App;
