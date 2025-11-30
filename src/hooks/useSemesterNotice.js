import { useEffect, useState } from "react";

export function useSemesterNotice() {
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    fetch("/data/semester_notice.json")
      .then((r) => r.ok && r.json())
      .then(setNotice)
      .catch(() => null);
  }, []);

  return notice;
}
