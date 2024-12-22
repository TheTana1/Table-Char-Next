import { PureComponent, useEffect, useState, memo} from "react"

export function EffectStand(){
    const
        [checked, setChecked] = useState(true),
        [childProp, setChildProp] =useState(55),
        [value,setValue]=useState('-value-');
    return <fieldset>
        <legend>Parent</legend>
        <input value={value} onInput={event=>setValue(event.target.value)}/><br/>
        <button onClick={()=>setChildProp(prev=>prev+1)}>{childProp}</button><br/>
        <input type="checkbox" checked={checked} onChange={()=>setChecked(prev=>!prev)}/>
        {checked && <ChildFunctionalStyle prop1={childProp}/>}
    </fieldset>
}

class ChildClassStyle extends PureComponent{
    constructor(props){
        super(props);
        this.state= { state1: 100 };
        console.log('Constructor');
    }
    render(){
        console.log('Child Render', this.state.state1, this.props.prop1);
        return <fieldset>
        <legend>Child Class-Style</legend>
        Props = {this.props.prop1}<br/>
        State = <input
        onInput={event=>this.setState({state1: +event.target.value})}
        type="number"
        value = {this.state.state1}/>
        ({this.state.state1})
    </fieldset>
    }
    componentDidMount(){
        console.log('componentDidMount()');
    }
    componentDidUpdate(){
        console.log('componentDidUpdate()');
    }
    componentWillUnmount(){
        console.log('componentWillUnmount()');
    }
}

const 
    ChildFunctionalStyle= memo(function({prop1}){
        const 
            [state1,setState1]=useState(100);
    console.log('render', state1 ,prop1);

    useEffect(()=> console.log('1) Mount + Update'));
    useEffect(()=> console.log('2) Mount'), []);
    useEffect(()=> console.log('3) Mount + state1'), [state1]);
    useEffect(()=> console.log('4) Mount + prop1'), [prop1]);
    useEffect(()=> ()=> console.log('5) Unmount'), []);

    return <fieldset>
        <legend>Child Functional-Style</legend>
        Props = {prop1}<br/>
        State = 
        <input
            onInput={event=>setState1(+event.target.value)}
            type="number"
            value = {state1}
        /> ({state1})
    </fieldset>;
});
