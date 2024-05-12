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

const Auth = () => {
  //Mutations
  const loginMutation = useMutation({ mutationFn:(signIn)});
  const signupMutation = useMutation({mutationFn:(signUp)});

  

  const onSignup = async(data) =>{
    try {
      const response = await signupMutation.mutateAsync(data);
      // Handle signup success
      console.log('Signup success:', response);
    } catch (error) {
      // Handle signup error
      console.error('Signup error:', error);
    }
  }
  const onLogin = async(data) =>{
    try {
      const response = await loginMutation.mutateAsync(data);
      console.log(response)
    } catch (error) {
      console.log("Login Error" ,error)
    }
  }

  return (

      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login  onLogin ={ onLogin} />
        </TabsContent>
        <TabsContent value="signup">
          <Signup onSignup={onSignup}/>
          </TabsContent>
      </Tabs>
    
  );
};

export default Auth;
