import { When } from "react-if";
import cookie from 'react-cookies'
import { useSelector } from "react-redux";

export default function Access(props) {
    cookie.load('actions')
    const {actions} = useSelector(state=>state.auth)

    function check(action) {
      return  actions.includes(action)
    }

    return(
        <>
        <When condition={check(props.action)}>
        {props.children}
        </When>
        </>
    )
}