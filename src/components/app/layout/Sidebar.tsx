// ... (نفس الـ Imports السابقة بدون تغيير)

        <Link
          to="/profile"
          className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
            location.pathname === "/profile" ? "bg-white/10" : "hover:bg-white/5"
          }`}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ 
              background: "linear-gradient(135deg, #6ABF4B 0%, #4A8E32 100%)",
              boxShadow: "0 0 12px rgba(106, 191, 75, 0.3)" 
            }}
          >
            {/* أيقونة المستخدم بلمسة ذهبية/خضراء فخمة */}
            <User className="w-4 h-4" style={{ color: "#ffffff" }} />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              {/* اسم المنصب بدل الاسم الشخصي لإعطاء طابع المؤسسات الكبرى */}
              <div className="text-white text-sm font-semibold tracking-wide truncate uppercase">
                Chief Ops Controller
              </div>
              <div className="text-white/50 text-[10px] font-medium truncate uppercase tracking-widest">
                Flight Management Division
              </div>
            </div>
          )}
        </Link>

// ... (باقي الملف يكمل عادي)
