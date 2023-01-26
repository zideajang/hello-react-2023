// virtual dom
const React = {
    createElement:(tag,props,...children)=>{
        var element = ({tag,props:{...props,children}})
        // console.log(element);
        if(typeof tag === 'function'){
            try{

                return tag(props);
            }catch({promise,key}){
                promise.then(data=>{
                    promiseCache.set(key,data);
                    rerender();
                })
                return {tag:'div',props:{children:["加载中..."]}};
            }

        }

        return element;
    }
};

const states = []
let stateCursor = 0;

const useState = (initialState) => {
    const FROZENCURSOR = stateCursor;
    states[FROZENCURSOR] = states[FROZENCURSOR] || initialState;

    // console.log('useState called with',initialState)
    // let state = initialState;
    let setState = (newState) => {
        // console.log('setState called with ',newState)
        states[FROZENCURSOR] = newState;
        rerender();
    }
    stateCursor++;
    return [states[FROZENCURSOR], setState];
};

const promiseCache = new Map();

const createResource = (thingThatReturnsASomthing, key)=>{
    if(promiseCache.has(key)){
        return promiseCache.get(key);
    }

    throw { promise:thingThatReturnsASomthing(), key};
}
const App = () => {
    // 
    const [name,setName] = useState("somebody");
    const [count,setCount] = useState(0);

    const userName = createResource(
        ()=> fetch("https://jsonplaceholder.typicode.com/users/1")
            .then(r => r.json())
            .then(payload=>payload.name)
        ,"user")
    return (<div className="react-2023">
        <h1 className="title">Hello {name}</h1>
        <h1 className="title">{userName}</h1>
        <input className="input" onchange={e=>setName(e.target.value)} type="text" placeholder={name} />
        <h2 className="subtitle">The count is: {count}</h2>
        <button onclick={()=>setCount(count + 1)} className="button is-primary">+</button>
        <button onclick={()=>setCount(count - 1)} className="button is-secondary">-</button>
        <p className="text">
            hope make bug progressin in 2023
        </p>
    </div>);
};

const render = (reactElement,container)=>{
    if(['string','number'].includes(typeof reactElement )){
        container.appendChild(document.createTextNode(String(reactElement)));
        return;
    }
    const actualDomElement = document.createElement(reactElement.tag);
    if(reactElement.props){
        Object.keys(reactElement.props).filter(p=>p!== 'children').forEach(p=>actualDomElement[p] = reactElement.props[p])
    }

    if(reactElement.props.children){
        reactElement.props.children.forEach(child=>render(child,actualDomElement));
    }

    container.appendChild(actualDomElement);
}
const rerender = ()=>{
    stateCursor = 0;
    document.querySelector("#root").firstChild.remove();
    render(<App/>,document.querySelector("#root"))
    
}

render(<App/>,document.querySelector("#root"))