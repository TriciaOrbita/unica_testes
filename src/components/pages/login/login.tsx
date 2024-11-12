import { useState } from "react";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Lógica de login
    console.log("Logging in:", { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-center text-gray-800">
              Login
            </h2>
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block text-gray-600">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Entrar
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
