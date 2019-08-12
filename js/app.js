//variables
var gallery = document.querySelector('.gallery__container');
var numberOfImages = 6;
var imagesInRow = 3;
var gridSize = 12;

//elements
var images = null
var hideButton = document.querySelector('#hideButton')
var showButton = document.querySelector('#showButton')
var input = document.querySelector('#tagInput')



//functions
var getImagesFromDOM = function () {
    return document.querySelectorAll('.gallery .gallery__container img')
}

//pobiera wartość inputa i czyści jego zawartość
var getInputvalueAndClear = function (input) {
    var text = input.value.trim()
    input.value = ''
    return text
}

//zwraca listę tagów dla każdego obrazka - jeden element tablicy = lista tagów dla jednego obrazka
var getImagesTags = function (imagesList) {
    var tagsList = []

    imagesList.forEach((image) => {
        tagsList.push(image.dataset.tag)
    })
    return tagsList
}

//sprawdza, czy obrazki zawierają dany tag i zwraca wartość true lub false
var doesImageContainsTag = function (imageList, tagText) {
    var tagsForImages = getImagesTags(imageList)

    var list = []
    tagsForImages.forEach((tags) => {
        var tagsArrForSingleImage = tags.split(',')
        if (tagsArrForSingleImage.includes(tagText)) {
            list.push(true)
        } else {
            list.push(false)
        }
    })

    return list
}

var renderFullPageImageView = function () {
    var body = document.querySelector('body')

    //tworzenie elementu z obrazkiem, wyświetlanoego na całej stronie
    var div = document.createElement('div')
    div.classList.add('fullScreen')
    div.addEventListener('click', function (e) {
        e.stopImmediatePropagation()

        this.parentElement.removeChild(this)
    })

    var container = document.createElement('div')
    container.classList.add('img-full-container')

    var img = document.createElement('img')
    img.setAttribute('src', this.getAttribute('src'))
    img.addEventListener('click', function (e) {
        e.stopPropagation()
    })

    var button = document.createElement('button')
    button.innerText = 'X'
    button.classList.add('close')
    button.addEventListener('click', function (e) {
        e.stopImmediatePropagation()

        var gallery = this.parentElement.parentElement;
        gallery.parentElement.removeChild(gallery)
    })

    container.appendChild(img)
    container.appendChild(button)
    div.appendChild(container)
    body.appendChild(div)
}

//For initial state
var renderGallery = function (destination, format, numberOfImages, imagesInRow, gridSize) {
    var rowsNumber = Math.ceil(numberOfImages / imagesInRow)
    for (var r = 0; r < rowsNumber; r++) {
        var row = document.createElement('div');
        row.classList.add('row')

        var i = 1 + r * imagesInRow;
        var stop = i + imagesInRow - 1;

        for (i; i <= stop; i++) {
            if (i > numberOfImages) {
                break;
            }

            var imageContainer = document.createElement('div')
            imageContainer.classList.add('gallery__image')
            imageContainer.classList.add(`col-${gridSize/imagesInRow}`)

            var image = document.createElement('img');
            image.setAttribute('src', `images/gallery/${i}.${format}`)
            image.dataset.id = i;

            image.addEventListener('click', renderFullPageImageView)

            imageContainer.appendChild(image)
            row.appendChild(imageContainer)
        }
        destination.appendChild(row)
    }
}

var renderFilteredImages = function (destination, images, imagesInRow, gridSize) {
    if (images.length === 0) {

    }
    destination.innerHTML = '';

    var rowsNumber = Math.ceil(images.length / imagesInRow)
    for (var r = 0; r < rowsNumber; r++) {
        var row = document.createElement('div');
        row.classList.add('row')

        var i = r * imagesInRow;
        var stop = i + imagesInRow;

        for (i; i < stop; i++) {
            if (i >= images.length) {
                break;
            }

            var imageContainer = document.createElement('div')
            imageContainer.classList.add('gallery__image')
            imageContainer.classList.add(`col-${gridSize/imagesInRow}`)
            imageContainer.appendChild(images[i])
            row.appendChild(imageContainer)
        }
        destination.appendChild(row)
    }
}

var renderImagesWithTags = function (imageList, containTagList, text, version) {

    if (imageList.length !== containTagList.length) {
        throw new Error
    }

    var imagesToShow = []

    if (version === 'hide') {
        if (text === "") {
            imageList.forEach((image) => {
                // image.classList.add('invisible')
            })
        } else {
            imageList.forEach((image, index) => {
                if (containTagList[index]) {
                    // image.classList.add('invisible')
                } else {
                    // image.classList.remove('invisible')
                    imagesToShow.push(image)
                }
            })
        }
    } else if (version === 'show') {
        if (text === "") {
            imageList.forEach((image) => {
                // image.classList.remove('invisible')
                imagesToShow.push(image)
            })
        } else {
            imageList.forEach((image, index) => {
                if (containTagList[index]) {
                    // image.classList.remove('invisible')
                    imagesToShow.push(image)
                } else {
                    // image.classList.add('invisible')
                }
            })
        }
    }
    renderFilteredImages(gallery, imagesToShow, imagesInRow, gridSize)
}

//Only for this example
var addTagsToImages = function () {
    var images = getImagesFromDOM()
    images[0].dataset.tag = "baseball,sport,people";
    images[1].dataset.tag = "bike,people";
    images[2].dataset.tag = "motorbike,sport,people";
    images[3].dataset.tag = "people";
    images[4].dataset.tag = "people,nightlife";
    images[5].dataset.tag = "nightlife";
}
//
//events

renderGallery(gallery, 'jpeg', numberOfImages, imagesInRow, gridSize)
addTagsToImages() // Only for this example
images = getImagesFromDOM();
//events
hideButton.addEventListener('click', function () {
    var text = getInputvalueAndClear(input)
    var imagesWithTag = doesImageContainsTag(images, text)

    renderImagesWithTags(images, imagesWithTag, text, 'hide')
})

showButton.addEventListener('click', function () {
    var text = getInputvalueAndClear(input)
    var imagesWithTag = doesImageContainsTag(images, text)

    renderImagesWithTags(images, imagesWithTag, text, 'show')
})

//--------------------------------