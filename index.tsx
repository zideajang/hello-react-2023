// virtual dom
const React = {
    createElement:(tag,props,...children)=>{
        var element = ({tag,props:{...props,children}})
        console.log(element);
        if(typeof tag === 'function'){
            return tag(props);
        }

        return element;
    }
}
const a = <div className="react-2023">
    <h1>Hello React 2023</h1>
    <p>
        10 Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Repellat ab, quaerat consectetur officiis omnis repudiandae, 
        voluptates, aperiam iusto aut fugiat accusantium sint hic blanditiis necessitatibus! 
        Placeat numquam distinctio similique rerum.
    </p>
</div>;