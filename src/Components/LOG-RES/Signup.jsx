// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Eye, EyeOff, Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Typewriter } from "react-simple-typewriter";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
//       const res = await axios.post(
//         `http://localhost:8000/api/v1/user/register`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (res.data.success) {
//         navigate("/verify");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong. Try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="relative w-full h-screen bg-gradient-to-br from-green-100 via-white to-green-50 overflow-hidden">
//       {/* Animated circles in background */}
//       <div className="absolute top-10 left-10 w-40 h-40 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
//       <div className="absolute bottom-10 right-10 w-56 h-56 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>

//       <div className="min-h-screen flex flex-col justify-center items-center p-4 animate-fadeIn">
//         <div className="w-full max-w-md space-y-6">
//           {/* Heading */}
//           <div className="text-center space-y-2">
//             <h1 className="text-3xl font-extrabold tracking-tight text-green-700">
//               <Typewriter
//                 words={["Create your account", "Join us today!"]}
//                 loop
//                 cursor
//                 typeSpeed={80}
//                 deleteSpeed={60}
//                 delaySpeed={1000}
//               />
//             </h1>
//             <p className="text-gray-600">
//               Start organizing your thoughts and ideas today 🚀
//             </p>
//           </div>

//           {/* Signup Card */}
//           <Card className="w-full max-w-sm shadow-xl hover:shadow-2xl transition-shadow duration-300">
//             <CardHeader className="space-y-1 text-center">
//               <CardTitle className="text-2xl text-green-600">
//                 Sign up
//               </CardTitle>
//               <CardDescription>
//                 Enter your details to create your account
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-col gap-6">
//                 <div className="grid gap-2">
//                   <Label htmlFor="username">Full Name</Label>
//                   <Input
//                     id="username"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="Enter your full name"
//                     required
//                   />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="ajay@example.com"
//                     required
//                   />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="password">Password</Label>
//                   <div className="relative">
//                     <Input
//                       id="password"
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       type={showPassword ? "text" : "password"}
//                       placeholder="••••••••"
//                       required
//                     />
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                       onClick={() => setShowPassword(!showPassword)}
//                       disabled={isLoading}
//                     >
//                       {showPassword ? (
//                         <EyeOff className="w-4 h-4 text-gray-600" />
//                       ) : (
//                         <Eye className="w-4 h-4 text-gray-600" />
//                       )}
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="flex flex-col gap-3">
//               <Button
//                 onClick={handleSubmit}
//                 type="submit"
//                 className="w-full bg-green-600 hover:bg-green-500 transition-all duration-200"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Creating account..
//                   </>
//                 ) : (
//                   "Signup"
//                 )}
//               </Button>
//               <Button
//                 variant="outline"
//                 className="w-full"
//                 onClick={() => navigate("/login")}
//               >
//                 Already have an account? Login
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;






import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student", // default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        navigate("/verify");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 overflow-hidden">
      {/* Animated circles in background */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-gray-700 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>

      <div className="min-h-screen flex flex-col justify-center items-center p-4 animate-fadeIn">
        <div className="w-full max-w-md space-y-6">
          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-1200">
              Create your account
            </h1>
            <p className="text-gray-600">
              Start organizing your thoughts and ideas today 
            </p>
          </div>

          {/* Signup Card */}
          <Card className="w-full max-w-sm shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl text-gray-1200 font-bold">Sign up</CardTitle>
              <CardDescription>
                Enter your details to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                {/* Full Name */}
                <div className="grid gap-2">
                  <Label htmlFor="username">Full Name</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ajay@example.com"
                    required
                  />
                </div>

                {/* Password */}
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-600" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Role Selection */}
                {/* <div className="grid gap-2">
                  <Label htmlFor="role">Register as</Label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="patient">Admin</option>
                    <option value="doctor">Student</option>
                    <option value="government">Teacher</option>
                  </select>
                </div> */}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button
                onClick={handleSubmit}
                type="submit"
                className="w-full bg-gray-600 hover:bg-gray-500 transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/login")}
              >
                Already have an account? Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
