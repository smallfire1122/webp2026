const API_URL =
  "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";

const loadButton = document.querySelector("#loadButton");
const searchButton = document.querySelector("#searchButton");
const keywordInput = document.querySelector("#keywordInput");
const statusText = document.querySelector("#status");
const dataBody = document.querySelector("#dataBody");
let allExhibitions = [];

function setStatus(message) {
  statusText.textContent = message;
}

function createCell(content) {
  const cell = document.createElement("td");

  if (content instanceof Node) {
    cell.appendChild(content);
  } else {
    cell.textContent = content;
  }

  return cell;
}

function createLink(url) {
  if (!url) {
    return document.createTextNode("無");
  }

  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "開啟";
  return link;
}

function getShowInfo(item) {
  return Array.isArray(item.showInfo) && item.showInfo.length > 0 ? item.showInfo[0] : {};
}

function renderRows(data) {
  dataBody.innerHTML = "";

  if (!Array.isArray(data) || data.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = '<td class="empty" colspan="6">查無資料</td>';
    dataBody.appendChild(row);
    return;
  }

  data.forEach((item) => {
    const showInfo = getShowInfo(item);
    const row = document.createElement("tr");

    row.appendChild(createCell(item.title || "無資料"));
    row.appendChild(createCell(showInfo.locationName || showInfo.location || "無資料"));
    row.appendChild(
      createCell(
        `${showInfo.time || item.startDate || "無資料"} ~ ${showInfo.endTime || item.endDate || "無資料"}`
      )
    );
    row.appendChild(createCell(showInfo.price || "免費或未提供"));
    row.appendChild(createCell(item.showUnit || "無資料"));
    row.appendChild(createCell(createLink(item.webSales || item.sourceWebPromote)));

    dataBody.appendChild(row);
  });
}

function filterExhibitions() {
  const keyword = keywordInput.value.trim();

  if (!allExhibitions.length) {
    setStatus("請先載入展覽資料，再使用搜尋功能。");
    return;
  }

  if (!keyword) {
    renderRows(allExhibitions);
    setStatus(`已顯示全部資料，共 ${allExhibitions.length} 筆。`);
    return;
  }

  const filteredData = allExhibitions.filter((item) => {
    const title = item.title || "";
    return title.includes(keyword);
  });

  renderRows(filteredData);
  setStatus(`搜尋完成，關鍵字「${keyword}」共有 ${filteredData.length} 筆結果。`);
}

function fetchExhibitions() {
  const request = new XMLHttpRequest();

  loadButton.disabled = true;
  setStatus("資料讀取中，請稍候...");

  request.open("GET", API_URL, true);
  request.responseType = "json";

  request.onload = function () {
    loadButton.disabled = false;

    if (request.status >= 200 && request.status < 300) {
      const data = request.response || JSON.parse(request.responseText);
      allExhibitions = data;
      renderRows(allExhibitions);
      setStatus(`讀取完成，共載入 ${allExhibitions.length} 筆展覽資料。`);
      return;
    }

    allExhibitions = [];
    renderRows([]);
    setStatus(`讀取失敗，HTTP 狀態碼：${request.status}`);
  };

  request.onerror = function () {
    loadButton.disabled = false;
    allExhibitions = [];
    renderRows([]);
    setStatus("Ajax 請求失敗，請確認網路、API 狀態，或改用本機伺服器開啟頁面。");
  };

  request.send();
}

loadButton.addEventListener("click", fetchExhibitions);
searchButton.addEventListener("click", filterExhibitions);
