import { useMutation } from "@tanstack/react-query";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../utils/components/ui/tabs";
import { signIn, signUp } from "../utils/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { setLogin } from "../features/user/authenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Auth = () => {
  //Mutations
  const loginMutation = useMutation({ mutationFn: signIn });
  const signupMutation = useMutation({ mutationFn: signUp });
  const user = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(user){
      navigate("/")
    }

  }, [navigate ,user])
  

  const onSignup = async (data) => {
    try {
      const response = await signupMutation.mutateAsync(data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(response);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };
  const onLogin = async (data) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/") ;

      localStorage.setItem( 
        "accessToken",
        response.data.data.accessToken
      )
      dispatch(setLogin(response.data.data.user))
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  return (
    <div className="min-h-screen ">
      <Tabs
        defaultValue="login"
        className="flex justify-center items-center flex-col "
      >
        <TabsList className="p-8 w-full h-52 mt-10 ">
          <TabsTrigger value="login" className="text-xl lg:text-3xl">
            Login
          </TabsTrigger>
          <TabsTrigger value="signup" className="text-xl lg:text-3xl">
            {" "}
            Signup
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="w-1/3 mt-32 ">
          <Login onLogin={onLogin} />
        </TabsContent>
        <TabsContent value="signup" className="w-1/3 mt-32 ">
          <Signup onSignup={onSignup} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
