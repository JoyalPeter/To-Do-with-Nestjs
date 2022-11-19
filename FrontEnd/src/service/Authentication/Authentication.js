import NoAccess from "../../pages/Invalid Access/InvalidAccess";
export default function ProtectedRoute({ children }) {
    
    const LoginToken=JSON.parse(localStorage.getItem("LoginToken"))
    if (!LoginToken) {
      // user is not authenticated
      return <NoAccess/>;
    }
    return children;
  };