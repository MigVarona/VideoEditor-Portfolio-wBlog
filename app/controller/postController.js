const Post = require("../models/post");
const fs = require("fs");
const path = require("path");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const currentDate = Date.now();
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      date: currentDate,
      category: req.body.category,
      content: req.body.content,
      imageUrl: req.files["imageFile"][0].path,
      secondImageUrl: req.files["imageFile2"][0].path,
      tags: req.body.tags,
      content2: req.body.content2,
      videoUrl: req.body.videoUrl,
    });

    const newPost = await post.save();

    const pageTitle = newPost.title.replace(/\s+/g, "-").toLowerCase();
    const newPageContent = `
<!DOCTYPE html>
<html data-wf-page="66095c4f9765fb9eae51e7eb">
<head>
  <script src="jquery.js"></script>
  <script src="jquery2.js"></script>
  <link rel="stylesheet" href="cloud.css">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="blog.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${newPost.title}</title>
  

</head>
<body>
      <div data-animation="over-left" class="navbar-transparent w-nav" data-easing2="ease" data-easing="ease"
        data-collapse="medium" role="banner" data-no-scroll="1" data-duration="400" data-doc-height="1">
        <div class="gradient"></div>
        <div class="nav-container w-container">
            <div class="nav-menu-wrapper"><a href="http://localhost:5502/index.html" class=" brand w-nav-brand"><img
                        src="http://localhost:5502/assets/flaticon home.png" loading="lazy" alt="logo" height="80" /></a>
                <nav role="navigation" class="nav-menu w-nav-menu">
                    <div class="tablet-menu"><a href="index.html" class="brand-tablet w-nav-brand"><img
                                src="http://localhost:5502/assets/flaticon home.png" loading="lazy" alt="logo" height="40" /></a>
                  
                    </div>
                    <div class="menu-wrap">

                        <div data-hover="true" data-delay="0" data-w-id="1bba802f-7b9e-f63d-4f08-053960cc3754"
                            class="nav-dropdown w-dropdown">
                            <div class="nav-dropdown-toggle w-dropdown-toggle">
                                <div class="clip">
                                    <div class="btn-banner-text">
                                        <a href="http://localhost:5502/about.html" style="color: white;">
                                            <div class="btn-title-text">About Me <span class="tablet-hidden">+</span>
                                            </div>

                                    </div>


                                    <div class="btn-banner-text button-text-bottom">
                                        <div class="btn-title-text">About Me +</div></a>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div data-hover="true" data-delay="0" data-w-id="1bba802f-7b9e-f63d-4f08-053960cc377a"
                            class="nav-dropdown w-dropdown">
                            <div class="nav-dropdown-toggle w-dropdown-toggle">
                                <div class="nav-dropdown-icon w-icon-dropdown-toggle"></div>
                                <div class="clip">
                                    <div class="btn-banner-text">
                                        <div class="btn-title-text">Works <span class="tablet-hidden">+</span></div>
                                    </div>
                                    <div class="btn-banner-text button-text-bottom">
                                        <div class="btn-title-text">Works +</div>
                                    </div>
                                </div>
                            </div>
                            <nav class="nav-dropdown-list w-dropdown-list">
                                <div class="nav-dropdown-link-wrapper"><a href="http://localhost:5502/education.html"
                                        class="nav-dropdown-link w-dropdown-link"><span class="nav-dropdown-link-line">
                                        </span>Education</a><a href="http://localhost:5502/entertaiment.html"
                                        class="nav-dropdown-link w-dropdown-link"><span class="nav-dropdown-link-line">
                                        </span>Entertaiment</a><a href="http://localhost:5502/corporate.html"
                                        class="nav-dropdown-link w-dropdown-link"><span class="nav-dropdown-link-line">
                                        </span>Corporate</a>

                                </div>
                            </nav>
                        </div><a data-w-id="1bba802f-7b9e-f63d-4f08-053960cc379e" class="nav-link w-inline-block">
                            <div class="clip">
                                <div class="btn-banner-text">
                                    <div class="btn-title-text"></div>
                                </div>
                                <div class="btn-banner-text button-text-bottom">
                                    <div class="btn-title-text"></div>
                                </div>
                            </div>
                        </a>

                        <div class="nav-button-wrapper"><a data-w-id="1bba802f-7b9e-f63d-4f08-053960cc380e"
                                href="contact.html" class="nav-button w-inline-block">
                                <div class="clip">
                                    <div class="btn-banner-text">
                                        <div class="btn-title-text">Let&#x27;s Talk</div>
                                    </div>
                                    <div class="btn-banner-text button-text-bottom">
                                        <div class="btn-title-text">Let&#x27;s Talk</div>
                                    </div>
                                </div>
                            </a></div>
                    </div>
                </nav>
                <div class="menu-button w-nav-button"><img
                        src="https://assets-global.website-files.com/66095c4f9765fb9eae51e781/66095c4f9765fb9eae51e859_menu-btn.svg"
                        loading="lazy" alt="icon" height="16" class="image-burger" /></div>
            </div>
        </div>
    </div>

  <div style="margin-top: 100px;" id="posts-container">
    <div class="blog-detail-section section-spacing">
      <div class="container-medium w-container">
        <div class="blog-detail">
          <h1>${newPost.title}</h1>
          <div class="blog-detail-meta">
          <div style="margin-bottom: 6px;" class="blog-dash"></div>
              <h6>${newPost.category}</h6>
          </div>
          <img id="blog-image" loading="eager" alt="${newPost.title}" class="blog-detail-image" src="/${newPost.imageUrl}">
          <p style="margin-bottom: 20px;">${newPost.content}</p>
          <img id="blog-image2" loading="eager" alt="${newPost.title}" class="blog-detail-image" src="/${newPost.secondImageUrl}">
          <div class="blog-rich-text">
            <div class="w-richtext">
               <p>${newPost.content2}</p>
              
              <figure style="padding-bottom: 56.206088992974244%;" class="w-richtext-align-fullwidth w-richtext-figure-type-video">
                <iframe id="video" allowfullscreen="" frameborder="0" scrolling="no" src="${newPost.videoUrl}" style="margin-top: 50px;"></iframe>
              </figure>
              <h5></h5>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

 <div class="blog-section" style="text-align: center; margin-top: 100px;">
        <div class="container w-container">
            <div class="section-title">
                <h3 class="heading-h6"
                    style="text-decoration: underline; text-decoration-color: white; text-decoration-thickness: 2px; opacity: 0.9;">
                    Recent post</h3>
            </div>
            <div style="margin-top: 90px;" class="w-dyn-list">
                <div role="list" class="grid-blog w-dyn-items"></div>
            </div>
        </div>
    </div>

  <script src="post.js"></script>



    <div style="margin-top: 200px;" class="page-content-wrapper">
        <div class="top-page-content">
            <section class="cta-section">
                <div class="w-layout-blockcontainer base-container w-container">
                    <div class="cta">
                        <div class="overflow">
                            <h2 data-w-id="245835ba-a1e9-5844-e03c-295d6d973b68" style="opacity:0">Have an idea for
                                a
                                project?</h2>
                        </div>
                        <div class="overflow"><a data-w-id="2ae99de2-ea3a-4258-aa22-fc486fbc59c2" style="opacity:0"
                                href="contact.html" class="underline-link w-inline-block">
                                <h3 class="cta-text">Let&#x27;s talk.</h3>
                                <div style="text-decoration: none;" class="hover-line">
                                    <div style="-webkit-transform:translate3d(-101%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(-101%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(-101%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(-101%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
                                        class="hover-line-fill"></div>
                                </div>
                            </a></div>
                    </div>
                </div>
            </section>

        </div>
    </div>

    <footer class="footer">
        <hr class="footer-line">
        <div class="footer-content">
            <p class="footer-text">Thanks for visiting me, follow me</p>
            <div class="social-links">
                <a target="_blank" href="https://www.linkedin.com/in/cristinagomezvara/" class="social-icon"><i
                        class="fa-brands fa-linkedin-in"></i></a>
                <a target="_blank" href=" https://vimeo.com/espica" class="social-icon"><i
                        class="fa-brands fa-vimeo-v"></i></a>
                <a target="_blank" href="https://www.flickr.com/photos/espica/albums" class="social-icon"><i
                        class="fa-brands fa-flickr"></i></a>
            </div>
        </div>
    </footer>
     <script src="main.js"></script>
</body>
</html>
`;

    const newPagePath = path.join(__dirname, "..", "public", "posts", `${pageTitle}.html`);
    fs.writeFileSync(newPagePath, newPageContent);

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }

    if (req.body.title != null) {
      post.title = req.body.title;
    }
    if (req.body.description != null) {
      post.description = req.body.description;
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }

    await post.remove();
    res.json({ message: "Deleted post" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostTitleById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
    res.json({ title: post.title });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};