/*
 * Models the content slider
 */
export class ContentSlider {

    /*
     * Initializes the model
     */
    constructor() {

        // setup view
        this.view = `<section id="content-slide-in-modal" class="app-slide-in-modal">

                        <div>

                            <div class="app-slide-in-modal-header">
                                <a class="app-slide-in-modal-pages" show-menus-modal><i class="material-icons">subject</i>Pages</a>
                    
                                <button class="add-button" toggle-add-page-modal>
                                    <i class="material-icons">add</i>
                                </button>
                            </div>
                            <!-- /app-slide-in-modal-header -->

                            <div id="pages-list" class="app-slide-in-modal-list"></div>
                            <!-- /app-slide-in-modal-list -->

                            <a class="app-slide-in-modal-menus" toggle-edit-menu-modal><i class="material-icons">menu</i>Menus</a>
                            
                        </div>
                    </section>
                    <!-- /.pages-->`

        // append view to DOM
        document.body.insertAdjacentHTML('beforeend', this.view)

        // setup private variables
        this.viewContent = document.querySelector('#view-content')
        this.contentSlideInModal = document.querySelector('#content-slide-in-modal')
        this.pagesList = document.querySelector('#pages-list')

        // handle events
        this.setupEvents()
        this.retrievePages()
    }

    /*
     * Retrieve pages
     */
    retrievePages() {

        let data = {},
            context = this

        // post form
        var xhr = new XMLHttpRequest()
        xhr.open('GET', '/api/page/list', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))

        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 400) {
                let json = JSON.parse(xhr.responseText)

                json.forEach(i => {
                    context.pagesList.innerHTML += `<div class="app-slide-in-modal-list-item">
                    <a href="/edit?page=/${i.url}">
                        <h3>${i.name}</h3>
                        <p>${i.url}</p>
                        <i class="material-icons">arrow_forward</i>
                    </a>
                </div>  `
                })
            
            }
            else {
                alert('retrieve error')
            }
        }
    }

    /*
     * Setup events
     */
    setupEvents() {
        var context = this

        this.viewContent.addEventListener('click', function(e) { 
            context.toggleSlider()
        })

        this.contentSlideInModal.addEventListener('click', function(e) {
            if(e.target.nodeName.toUpperCase() == 'SECTION') {
                context.toggleSlider()
            }
        })
    }

    /*
     * Toggles the slide-in modal
     */
    toggleSlider() {
        if(this.contentSlideInModal.hasAttribute('active')) {
           this.contentSlideInModal.removeAttribute('active')     
        }
        else {
            this.contentSlideInModal.setAttribute('active', '')
        }
    }
}