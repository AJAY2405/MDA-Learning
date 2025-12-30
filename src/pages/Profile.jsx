import React, { useState } from "react";
import UserLogo from "../Components/assets/user.jpg";
import { getData } from "@/context/userContext";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";

const Profile = () => {
  const { user, setUser } = getData();

  const [input, setInput] = useState({
    username: user?.username || "",
    description: user?.description || "",
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeFileHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      file: e.target.files?.[0],
    }));
  };

  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("username", input.username);
    formData.append("description", input.description);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/profile/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success(res.data.message || "Profile updated");
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-6 py-20">
    
    {/* Main Card */}
    <div className="relative w-full max-w-6xl rounded-[32px] bg-white/90 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.6)] border border-white/20 p-12">

      {/* Top Glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-black/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col lg:flex-row gap-14 items-center lg:items-start">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black to-gray-500 blur-md opacity-70" />
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-[5px] border-white shadow-2xl">
              <img
                src={user?.avatar || UserLogo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p className="mt-6 text-sm uppercase tracking-widest text-gray-600">
            Profile Image
          </p>
        </div>

        {/* Info Section */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl font-black tracking-tight text-black">
            {user?.username || "User"}
          </h1>

          <div className="mt-6 space-y-3 text-lg text-gray-700">
            <p>
              <span className="font-semibold text-black">Email</span>  
              <span className="ml-2">{user?.email}</span>
            </p>

            <p className="capitalize">
              <span className="font-semibold text-black">Role</span>  
              <span className="ml-2">{user?.role}</span>
            </p>
          </div>

          {/* Divider */}
          <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-black/30 to-transparent" />

          {/* CTA */}
          <Button
            onClick={() => setOpen(true)}
            className="relative overflow-hidden bg-black text-white px-10 py-4 rounded-full text-lg font-semibold tracking-wide shadow-xl hover:scale-[1.03] transition-all"
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* EDIT DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-3xl bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl">

          <DialogHeader>
            <DialogTitle className="text-3xl font-black tracking-tight text-black">
              Edit Profile
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Make your profile stand out
            </DialogDescription>
          </DialogHeader>

          <div className="mt-8 space-y-6">
            <div>
              <Label className="text-black font-semibold">Username</Label>
              <Input
                name="username"
                value={input.username}
                onChange={changeEventHandler}
                className="mt-2 h-12 rounded-xl border-gray-300 focus:border-black focus:ring-black"
              />
            </div>

            <div>
              <Label className="text-black font-semibold">
                Profile Image
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="mt-2 cursor-pointer h-12 rounded-xl border-gray-300"
              />
            </div>
          </div>

          <DialogFooter className="mt-10">
            <Button
              onClick={submitHandler}
              disabled={loading}
              className="bg-black text-white px-8 py-3 rounded-full text-lg hover:scale-[1.02] transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Saving
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  </div>
);
}

export default Profile;
