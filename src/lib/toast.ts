export const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
  if (typeof window === "undefined") return;
  
  // Find or create container
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none";
    document.body.appendChild(container);
  }
  
  const toast = document.createElement("div");
  
  // Styling matching Devosphere premium theme
  const bgClass = 
    type === "success" 
      ? "bg-emerald-600 border border-emerald-500/30" 
      : type === "error" 
        ? "bg-red-600 border border-red-500/30" 
        : "bg-[#6d24e5] border border-[#7c3aed]/30";

  toast.className = `px-6 py-4 rounded-2xl shadow-2xl font-heading font-bold text-sm text-white transition-all duration-300 transform translate-y-4 opacity-0 flex items-center gap-2.5 pointer-events-auto backdrop-blur-md ${bgClass}`;
  
  // Add a nice icon based on type
  let icon = "";
  if (type === "success") {
    icon = `<svg class="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path></svg>`;
  } else if (type === "error") {
    icon = `<svg class="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"></path></svg>`;
  } else {
    icon = `<svg class="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12v-.008z"></path></svg>`;
  }

  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.className = toast.className.replace("translate-y-4 opacity-0", "translate-y-0 opacity-100");
  }, 10);
  
  // Animate out and remove
  setTimeout(() => {
    toast.className = toast.className.replace("translate-y-0 opacity-100", "translate-y-4 opacity-0");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
};
