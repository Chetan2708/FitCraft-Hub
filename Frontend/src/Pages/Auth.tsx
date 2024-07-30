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
import { useEffect, useState } from "react";
import { UserRootState } from "../types/reduxTypes";
import { LoginType, SignUpType } from "../definitions";

const Auth = () => {
  // State to manage active tab
  const [activeTab, setActiveTab] = useState("login");

  //Mutations
  const loginMutation = useMutation({ mutationFn: signIn });
  const signupMutation = useMutation({ mutationFn: signUp });
  const user = useSelector((state:UserRootState) => state.auth.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const onSignup = async (data:SignUpType) => {
    try {
      const response = await signupMutation.mutateAsync(data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
   
    } catch (error:any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  const onLogin = async (data:LoginType) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");

      localStorage.setItem("accessToken", response.data.data.accessToken);
      dispatch(setLogin(response.data.data.user));
    } catch (error : any) {
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
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex justify-center items-center flex-col "
      >
        <TabsList className="p-8 w-full h-52 mt-10 ">
          <TabsTrigger value="login" className="text-xl lg:text-3xl">
            Login
          </TabsTrigger>
          <TabsTrigger value="signup" className="text-xl lg:text-3xl">
            Signup
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login onLogin={onLogin} changeTab={setActiveTab} />
        </TabsContent>
        <TabsContent value="signup">
          <Signup onSignup={onSignup} changeTab={setActiveTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
