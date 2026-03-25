export const downloadFile = async (url: string, filename = 'file') => {
  console.log(url);
  try {
    const res = await fetch(url);
    const blob = await res.blob();

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(link.href);
  } catch (err) {
    console.error('다운로드 실패', err);
  }
};
