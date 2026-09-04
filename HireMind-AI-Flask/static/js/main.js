function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.style.cssText = `
    background: #191919;
    color: white;
    padding: 0.75rem 1.25rem;
    border-radius: 6px;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  toast.innerText = message;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
