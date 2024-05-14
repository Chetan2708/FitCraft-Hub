import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../utils/components/ui/dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../utils/components/ui/avatar";
import { Button } from "../../utils/components/ui/button";
import { setLogout } from "../../features/user/authenticationSlice";
import Swal from "sweetalert2";

const ProfileModal = () => {
  const user = useSelector((state) => state.auth?.userData);
  const dispatch = useDispatch();
  const handleLogout =()=>{
    localStorage.clear()
    dispatch(setLogout())
  }
  return (
    <Dialog>
      <DialogTrigger className="p-4" >
        <Avatar >
          <AvatarImage src={user?.pic || "https://github.com/shadcn.png"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-between mt-6">
            <h1
            className="text-2xl text-red-500 font-bold">{user?.name}</h1>
            <h1>
              <Avatar>
                <AvatarImage src={user?.pic || "https://github.com/shadcn.png"} />
              </Avatar>
            </h1>
          </DialogTitle>
          <DialogDescription>
            <div className="text-xl">
            {user?.email}
            </div>
            </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <Button onClick={handleLogout}>
                Logout
            </Button>
      </DialogFooter>
      </DialogContent>
   
    </Dialog>
  );
};

export default ProfileModal;
