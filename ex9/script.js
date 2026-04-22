const API_KEY = "ca370d51a054836007519a00ff4ce59e";
const RECENT_URL =
  `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&per_page=7&format=json&nojsoncallback=1`;

const loadButton = document.querySelector("#loadButton");
const statusText = document.querySelector("#status");
const galleryWrapper = document.querySelector("#galleryWrapper");

function setStatus(message) {
  statusText.textContent = message;
}

function buildSizesUrl(photoId) {
  return `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`;
}

function pickBestSize(sizes) {
  const preferredLabels = ["Large", "Medium 800", "Medium 640", "Medium", "Small 400", "Small 320"];

  for (const label of preferredLabels) {
    const match = sizes.find((item) => item.label === label);
    if (match) {
      return match;
    }
  }

  return sizes[sizes.length - 1] || null;
}

async function getRecentPhotos() {
  const response = await fetch(RECENT_URL);

  if (!response.ok) {
    throw new Error(`getRecent 失敗，HTTP ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data.photos?.photo) ? data.photos.photo : [];
}

async function getPhotoDetail(photo) {
  const response = await fetch(buildSizesUrl(photo.id));

  if (!response.ok) {
    throw new Error(`photo_id ${photo.id} 取得尺寸失敗，HTTP ${response.status}`);
  }

  const data = await response.json();
  const sizes = Array.isArray(data.sizes?.size) ? data.sizes.size : [];
  const pickedSize = pickBestSize(sizes);

  if (!pickedSize) {
    return null;
  }

  return {
    id: photo.id,
    title: photo.title || "Untitled",
    owner: photo.owner,
    imageUrl: pickedSize.source,
    flickrPageUrl: `https://www.flickr.com/photos/${photo.owner}/${photo.id}`,
    sizeLabel: pickedSize.label
  };
}

function renderPlaceholder(message) {
  galleryWrapper.className = "placeholder";
  galleryWrapper.innerHTML = message.replace(/\n/g, "<br>");
}

function renderGallery(items) {
  if (!items.length) {
    renderPlaceholder("沒有可顯示的圖片資料。");
    return;
  }

  const gallery = document.createElement("div");
  gallery.className = "gallery";

  items.forEach((item) => {
    const link = document.createElement("a");
    link.className = "photo";
    link.href = item.flickrPageUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.title = item.title;

    const image = document.createElement("img");
    image.src = item.imageUrl;
    image.alt = item.title;
    image.loading = "lazy";

    const caption = document.createElement("div");
    caption.className = "caption";
    caption.textContent = `${item.title} (${item.sizeLabel})`;

    link.appendChild(image);
    link.appendChild(caption);
    gallery.appendChild(link);
  });

  galleryWrapper.className = "";
  galleryWrapper.innerHTML = "";
  galleryWrapper.appendChild(gallery);
}

async function loadImages() {
  loadButton.disabled = true;
  setStatus("正在生成新的照片牆...");

  try {
    const recentPhotos = await getRecentPhotos();

    if (!recentPhotos.length) {
      renderPlaceholder("目前沒有可用圖片。\n請再試一次。");
      setStatus("這次沒有載入到圖片，請再按一次。");
      return;
    }

    const results = await Promise.all(recentPhotos.map(getPhotoDetail));
    const displayItems = results.filter(Boolean);

    renderGallery(displayItems);
    setStatus("新的照片牆已生成。");
  } catch (error) {
    renderPlaceholder("生成失敗\n請確認網路連線後再試一次。");
    setStatus("照片牆生成失敗，請稍後再試。");
  } finally {
    loadButton.disabled = false;
  }
}

loadButton.addEventListener("click", loadImages);
