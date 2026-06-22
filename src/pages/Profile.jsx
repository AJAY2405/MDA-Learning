import React, { useState } from "react";
import { getData } from "@/context/userContext";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import Avatar1 from "../components/assets/avatar1.jpg";
import Avatar2 from "../components/assets/avatar2.jpg";
import Avatar3 from "../components/assets/avatar3.jpg";
import Avatar4 from "../components/assets/avatar4.jpg";
import Avatar5 from "../components/assets/avatar5.jpg";

const avatarOptions = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5];

const Profile = () => {
  const { user, setUser } = getData();

  const [input, setInput] = useState({
    username: user?.username || "",
    avatar: user?.avatar || Avatar1,
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const submitHandler = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/profile/update`,
        {
          username: input.username,
          avatar: input.avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Profile updated successfully");
        setOpen(false);
      }
    } catch (error) {
      toast.error("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-20 bg-white dark:bg-black transition-colors duration-300 overflow-hidden">

      {/* 🌿 Background Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-72 h-72 bg-green-300/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-green-400/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <div className="w-full max-w-4xl rounded-3xl p-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-2xl border border-gray-200 dark:border-green-900">

        {/* Profile Info */}
        <div className="flex flex-col items-center">
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-green-500 shadow-lg hover:scale-105 transition">
            <img
              src={input.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-green-700 dark:text-green-400">
            {user?.username}
          </h1>

          <p className="text-gray-600 dark:text-gray-400">
            {user?.email}
          </p>

          <Button
            onClick={() => setOpen(true)}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-2 shadow-md transition hover:scale-105"
          >
            Edit Profile
          </Button>
        </div>

        {/* Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-green-900">

            <DialogHeader>
              <DialogTitle className="text-2xl text-green-700 dark:text-green-400">
                Edit Profile
              </DialogTitle>
            </DialogHeader>

            {/* Username */}
            <div className="mt-6">
              <Label className="text-gray-700 dark:text-gray-300">
                Username
              </Label>
              <input
                type="text"
                value={input.username}
                onChange={(e) =>
                  setInput({ ...input, username: e.target.value })
                }
                className="mt-2 w-full p-3 rounded-xl border border-gray-300 dark:border-green-900 bg-white dark:bg-zinc-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Avatar Selection */}
            <div className="mt-6">
              <Label className="text-gray-700 dark:text-gray-300">
                Choose Avatar
              </Label>

              <div className="grid grid-cols-5 gap-4 mt-4">
                {avatarOptions.map((avatar, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      setInput({ ...input, avatar: avatar })
                    }
                    className={`cursor-pointer rounded-full overflow-hidden border-4 transition-all duration-300 hover:scale-110 ${
                      input.avatar === avatar
                        ? "border-green-500"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={avatar}
                      alt={`avatar-${index}`}
                      className="w-20 h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="mt-8">
              <Button
                onClick={submitHandler}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-2 transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
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
};

export default Profile;