import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // تجاهل ملفات البناء وأي مخلفات برمجية سابقة
  { ignores: ["dist", ".output", ".vinxi", ".lovable", "node_modules"] },
  {
    extends: [
      js.configs.recommended, 
      ...tseslint.configs.recommended,
      eslintPluginPrettier // دمج Prettier لضمان تنسيق الكود تلقائياً
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn", 
        { allowConstantExport: true }
      ],
      // تفعيل التحذير للمتغيرات غير المستخدمة لضمان نظافة الكود
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      //  
      "@typescript-eslint/no-explicit-any": "off" 
    },
  }
);
