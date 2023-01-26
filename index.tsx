// virtual dom
const React = {
    createElement:(tag,props,...children)=>{
        var element = ({tag,props:{...props,children}})
        // console.log(element);
        if(typeof tag === 'function'){
            return tag(props);
        }

        return element;
    }
}
const App = () => (
<div className="react-2023">
    <h1 className="title">Hello React 2023</h1>
    <input className="input" type="text" placeholder="name" />
    <p className="text">
        hope make bug progressin in 2023
    </p>
</div>);

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

render(<App/>,document.querySelector("#root"))