/* Gom nhu cầu thành đoạn văn để khách tự gửi qua Zalo. Không lưu, không gửi đi đâu. */
(() => {
  const form = document.getElementById('need-form');
  if (!form) return;
  const out = document.getElementById('need-text'), copy = document.getElementById('need-copy'), done = document.getElementById('need-copied');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(form);
    const date = f.get('date') ? new Date(f.get('date') + 'T00:00').toLocaleDateString('vi-VN') : 'chưa xác định';
    out.textContent = 'Nhu cầu bảo hiểm tai nạn cho nhân viên\n'
      + '• Mục tiêu: ' + f.get('goal') + '\n'
      + '• Số người dự kiến: ' + (f.get('count') || 'chưa xác định') + '\n'
      + '• Ngày cần hiệu lực: ' + date + '\n'
      + '• Nhóm công việc: ' + (String(f.get('job') || '').trim() || 'chưa ghi');
    copy.disabled = false; done.textContent = '';
    document.getElementById('need-result').focus();
  });
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(out.textContent); done.textContent = 'Đã sao chép. Mở Zalo và dán vào khung chat.'; }
    catch { done.textContent = 'Trình duyệt chặn sao chép, anh/chị bôi đen đoạn trên để sao chép.'; }
  });
})();
