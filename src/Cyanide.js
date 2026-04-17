/** @jsx cyanide */

function cyanide(type, props, ...args) {
  const children = [].concat(...args);
  return {
    type,
    props,
    children,
  };
}


function render(node) {

    if( typeof node.type === 'function'){
        const result = node.type(node.props)
        return render(result)
    }

    const element = document.createElement(node.type);
    
    if (node.props) {
        Object.keys(node.props).map((key) => {
            element.setAttribute(key, node.props[key]);
        });
    }
    
    element.appendChild(document.createTextNode(node.children));
    return element;
}


const Subtitle = ({text}) => <h2>{text}</h2>

const title = (<h1 class="title" id="one">hola</h1>);


document.body.appendChild(render(title));
document.body.appendChild(render(<Subtitle text='god'/>));


