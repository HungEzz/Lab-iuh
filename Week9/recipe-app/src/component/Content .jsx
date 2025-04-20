import {React, useState, useEffect} from 'react'

function Content () {
    
    const SmallRecipeCard = ({ recipe }) => {
        return (
          <div className="small-recipe-card">
            <img src={recipe.image} alt={recipe.title} className="small-card-image" />
            <div className="small-card-info">
              <h4 className="small-card-title">{recipe.title}</h4>
              <div className="small-card-meta">
                <span className="small-card-time">{recipe.time}</span>
                <span className="small-card-save"> {/* Placeholder for save icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                </span>
              </div>
            </div>
          </div>
        );
      };
      
     
      const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- State mới cho phần Recipes With Videos ---
  const [videoRecipes, setVideoRecipes] = useState([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [errorVideos, setErrorVideos] = useState(null);

   // --- State MỚI cho phần Editor's Pick ---
   const [editorPicks, setEditorPicks] = useState([]);
   const [isLoadingEditorPicks, setIsLoadingEditorPicks] = useState(true);
   const [errorEditorPicks, setErrorEditorPicks] = useState(null);
 

  useEffect(() => {
    // Fetch data from your json-server endpoint
    fetch('http://localhost:3001/summerRecipes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setRecipes(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Fetching recipes failed:", error);
        setError(error);
        setIsLoading(false);
      });



        
 // --- Fetch dữ liệu cho phần Recipes With Videos ---
 fetch('http://localhost:3001/videoRecipes') // <-- Fetch từ endpoint mới
 .then(response => {
   if (!response.ok) {
     throw new Error('Network response was not ok ' + response.statusText);
   }
   return response.json();
 })
 .then(data => {
   setVideoRecipes(data);
   setIsLoadingVideos(false);
 })
 .catch(error => {
   console.error("Fetching video recipes failed:", error);
   setErrorVideos(error);
   setIsLoadingVideos(false);
 });




 // --- Fetch DỮ LIỆU MỚI cho phần Editor's Pick ---
 fetch('http://localhost:3001/editorPicks') // <-- Fetch từ endpoint của Editor's Pick
 .then(response => {
   if (!response.ok) {
     throw new Error('Network response was not ok ' + response.statusText);
   }
   return response.json();
 })
 .then(data => {
   setEditorPicks(data);
   setIsLoadingEditorPicks(false);
 })
 .catch(error => {
   console.error("Fetching editor picks failed:", error);
   setErrorEditorPicks(error);
   setIsLoadingEditorPicks(false);
 });

}, []); // Dependency array rỗng để effect chạy khi component mount


  if (isLoading || isLoadingVideos || isLoadingEditorPicks) {
    return <main className="content"><p>Loading recipes...</p></main>;
  }

  if (error || errorVideos || errorEditorPicks) {
    return <main className="content"><p>Error loading one or more recipe sections</p></main>;
  }

  const VideoRecipeCard = ({ recipe }) => {
    return (
      <div className="video-recipe-card"> {/* Class mới cho loại thẻ này */}
        <img src={recipe.image} alt={recipe.title} className="video-card-image" />
        <div className="video-card-info">
          <h4 className="video-card-title">{recipe.title}</h4>
          <div className="video-card-meta">
            <span className="video-card-time">{recipe.time}</span>
            <span className="video-card-save"> {/* Placeholder cho icon save */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
            </span>
          </div>
          {/* Có thể thêm icon video overlay lên ảnh hoặc đâu đó sau này */}
        </div>
      </div>
    );
  };



  const EditorPickRecipeCard = ({ recipe }) => {
    return (
        <div className="editor-pick-card"> {/* Container chính của MỘT thẻ */}

        {recipe.image && <img src={recipe.image} alt={recipe.title} className="editor-card-image" />}
  
         <span className="editor-card-save">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          </span>
  
        {/* --- 3. Phần thông tin (Nằm ở bên phải ảnh) --- */}
        <div className="editor-card-info">
          {/* 3a. Tiêu đề công thức */}
          {recipe.title && <h4 className="editor-card-title">{recipe.title}</h4>}
          {/* 3b. Thời gian nấu */}
          {recipe.time && <div className="editor-card-time">{recipe.time}</div>}
  
          {/* 3c. Thông tin tác giả (ảnh avatar và tên) */}
          {/* Chỉ render div này nếu có ít nhất avatar hoặc tên tác giả */}
          {(recipe.authorAvatar || recipe.authorName) && (
            <div className="editor-card-author">
                {recipe.authorAvatar && <img src={recipe.authorAvatar} alt={recipe.authorName} className="author-avatar" />}
                {recipe.authorName && <span className="author-name">{recipe.authorName}</span>}
            </div>
          )}
  
          {/* --- 3d. Nội dung mô tả --- */}
          {/* Kiểm tra nếu có nội dung mô tả thì mới render thẻ <p> */}
          {recipe.description && <p className="editor-card-description">{recipe.description}</p>}
          {/* -------------------------- */}
        </div>
      </div>
    );
  };
  



  return (
      <main className="content">
                <div className="content-header">
            <h2 className="content-title">This Summer Recipes</h2>
            <p className="content-subtitle">We have all your Independence Day sweets covered.</p>
        </div>

        <div className="recipes-grid"> {/* Container for the grid */}
            {recipes.map(recipe => (
            <SmallRecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>

            {/* --- Phần mới: Recipes With Videos --- */}
      <div className="content-header" style={{ marginTop: '60px' }}> {/* Thêm khoảng cách giữa 2 phần */}
        <h2 className="content-title">Recipes With Videos</h2> {/* Tiêu đề mới */}
        <p className="content-subtitle">Cooking Up Culinary Creations with Step-by-Step Videos</p>{/* Phụ đề mới */}
      </div>

      <div className="videos-recipes-grid"> {/* Container lưới mới cho phần video */}
         {videoRecipes.map(recipe => (
           <VideoRecipeCard key={recipe.id} recipe={recipe} /> 
         ))}
      </div>
       {/* ------------------------------------ */}

        {/* --- Phần Editor's Pick --- */}
       <div className="content-section-container" style={{ marginTop: '60px' }}> {/* Container cho riêng phần Editor's Pick */}
         <div className="content-header"> {/* Tiêu đề và phụ đề của riêng phần này */}
           <h2 className="content-title">Editor's pick</h2>
           <p className="content-subtitle">Curated Culinary Delights: Handpicked Favorites by Our Expert Editors!</p>
         </div>

         {/* --- CONTAINER LƯỚI: Dùng .map() ở đây để render ra NHIỀU thẻ --- */}
         <div className="editor-picks-grid"> {/* Container LƯỚI này sẽ chứa các thẻ con */}
           {/* Vòng lặp .map() qua MẢNG editorPicks */}
           {editorPicks.map(recipe => (
             // Với MỖI 'recipe' trong mảng, tạo ra MỘT component EditorPickRecipeCard
             // Component EditorPickRecipeCard này đã được code để hiển thị ĐẦY ĐỦ các thành phần của 1 thẻ
             <EditorPickRecipeCard key={recipe.id} recipe={recipe} />
           ))}
         </div>
        {/* ----------------------------------------------------------------- */}
       </div>
      {/* ------------------------- */}

         
      </main>
  )
}

export default Content 
