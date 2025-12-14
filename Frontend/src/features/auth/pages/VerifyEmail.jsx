import { useSearchParams } from "react-router-dom";
import api from "@/lib/axios";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const verify = async () => {
    await api.post("/auth/verify-email", { token });
    alert("Email verified. You can now login.");
  };

  return <button onClick={verify}>Verify Email</button>;
}
