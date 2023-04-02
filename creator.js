window.addEventListener('load', function() {
    const dialog = document.querySelector("#dialog");
    const consentCookie = 'cookieConsent=true';
    const cookieDialog = document.querySelector("#cookie-dialog");
    let cookieConsentSet = document.cookie?.includes(consentCookie);
    const queryParams = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop)
    });
    let queryCharacter = queryParams?.character;

    let selectedBody;
    let selectedSkin;
    let selectedEyes;
    let selectedEyeColor;
    let selectedGlasses;
    let selectedGlassesColor;
    let selectedHairBack;
    let selectedHairFront;
    let selectedBeard;
    let selectedHairColor;
    let selectedBlush;
    let selectedBlushColor;
    let selectedLips;
    let selectedLipsColor;
    let selectedFreckles;
    let selectedClothesTop;
    let selectedClothesTopColor;
    let selectedClothesBottom;
    let selectedClothesBottomColor;
    let selectedShoeColor;

    if (queryCharacter) {
        setFrom(atob(queryCharacter));
    } else if (this.document.cookie?.length > 0 && this.document.cookie?.includes('body')) {
        setFrom(this.document.cookie);
    } else {
        setRandomValues();
    }

    function crumbleCookies(input) {
        const cookies = input?.split('; ');
        const allCookies = {};
        cookies.forEach(cookie => {
            const crumbles = cookie.split('=');
            allCookies[crumbles[0]] = crumbles[1];
        })
        return allCookies;
    }
    
    function setFrom(input) {
        const cookies = crumbleCookies(input);
        selectedBody = cookies['body'];
        selectedSkin = cookies['skin'];
        selectedEyes = cookies['eyes'];
        selectedEyeColor = cookies['eyecolor'];
        selectedGlasses = cookies['glasses'];
        selectedGlassesColor = cookies['glassescolor'];
        selectedHairBack = cookies['hairback'];
        selectedHairFront = cookies['hairfront'];
        selectedBeard = cookies['beard'];
        selectedHairColor = cookies['haircolor'];
        selectedBlush = cookies['blush'] === 'true';
        selectedBlushColor = cookies['blushcolor'];
        selectedLips = cookies['lips'] === 'true';
        selectedLipsColor = cookies['lipscolor'];
        selectedFreckles = cookies['freckles'] === 'true';
        selectedClothesTop = cookies['clothestop'];
        selectedClothesTopColor = cookies['clothestopcolor'];
        selectedClothesBottom = cookies['clothesbottom'];
        selectedClothesBottomColor = cookies['clothesbottomcolor'];
        selectedShoeColor = cookies['shoecolor'];

        document.querySelector('#name').value = cookies['name'] || '';

        getColor('.eyecolor', selectedEyeColor);
        getColor('.haircolor', selectedHairColor);
        getColor('.clothestopcolor-palette', selectedClothesTopColor);
        getColor('.clothesbottomcolor-palette', selectedClothesBottomColor);
        getColor('.shoecolor-palette', selectedShoeColor);
        getColor('.blushcolor-palette', selectedBlushColor);
        getColor('.lipcolor-palette', selectedLipsColor);
        getColor('.glassescolor-palette', selectedGlassesColor);
    }

    function setRandomValues() {
        selectedBody = Math.floor(Math.random() * 2) + 1;
        selectedSkin = Math.floor(Math.random() * 9) + 1;
        selectedEyes = Math.floor(Math.random() * 9) + 1;
        selectedEyeColor = getRandomColor('.eyecolor', 26);
        selectedHairColor = getRandomColor('.haircolor', 26);
        selectedHairBack = Math.floor(Math.random() * 9);
        selectedHairFront = Math.floor(Math.random() * 16) + 1;

        // clothes
        selectedClothesTop = Math.floor(Math.random() * 5) + 1;
        selectedClothesTopColor = getRandomColor('.clothestopcolor-palette', 26);
        selectedClothesBottom = Math.floor(Math.random() * 8) + 1;
        selectedClothesBottomColor = getRandomColor('.clothesbottomcolor-palette', 26);
        selectedShoeColor = getRandomColor('.shoecolor-palette', 26);

        // facial features only 2/5
        let randomFacialFeature1 = Math.floor(Math.random() * 10);
        let randomFacialFeature2 = Math.floor(Math.random() * 10);
        selectedBlushColor = getRandomColor('.blushcolor-palette', 2);
        selectedLipsColor = getRandomColor('.lipcolor-palette', 7);
        selectedGlassesColor = getRandomColor('.glassescolor-palette', 6);
        selectedBlush = false;
        selectedLips = false;
        selectedFreckles = false;
        selectedGlasses = 0;
        selectedBeard = 0;
        setRandomFacialFeature(randomFacialFeature1);
        setRandomFacialFeature(randomFacialFeature2);
    }

    function setRandomFacialFeature(number) {
        switch(number) {
            case 1:
                // blush
                selectedBlush = true;
                break;
            case 2:
                // lips
                selectedLips = true;
                break;
            case 3:
                // freckles
                selectedFreckles = true;
                break;
            case 4:
                // glasses
                selectedGlasses = Math.floor(Math.random() * 4);
                break;
            case 5:
                // beard
                selectedBeard = Math.floor(Math.random() * 5);
                break;
        }
    }

    function getRandomColor(className, numerOfColors) {
        const allColors = document.querySelectorAll(className);
        const rnd = Math.floor(Math.random() * numerOfColors);
        allColors[rnd].classList.add('selected');
        return allColors[rnd].style.backgroundColor;
    }

    function getColor(className, colorValue) {
        const allColors = document.querySelectorAll(className);
        allColors.forEach(col => {
            if (col.style.backgroundColor == colorValue) {
                col.classList.add('selected');
            }
        })
    }

    const randomizer = document.querySelector('#randomize');
    randomizer.addEventListener('click', () => {
        const selected = document.querySelectorAll('.selected');
        selected.forEach(element => element.classList.remove('selected'));
        setRandomValues();
        setSelectedBodyButton();
        setSkin();
        sliderSkin.value = selectedSkin;
        setEyes();
        sliderEyes.value = selectedEyes;
        setHairBack();
        sliderHairBack.value = selectedHairBack || 0;
        setHairFront();
        sliderHairFront.value = selectedHairFront;
        setGlasses();
        sliderGlasses.value = selectedGlasses || 0;
        setBeard();
        sliderBeard.value = selectedBeard || 0;
        setBlush();
        checkBoxBlush.checked = selectedBlush;
        setLipColor();
        checkBoxLipColor.checked = selectedLips;
        setFreckles();
        checkBoxFreckles.checked = selectedFreckles;
    })

    /**
     * BODY
     */
    var body1 = document.querySelector('#body1');
    var body2 = document.querySelector('#body2');
    setSelectedBodyButton();

    body1.addEventListener('click', function() {
        setBody(1);
    })

    body2.addEventListener('click', function() {
        setBody(2);
    })
    
    function setBody(value) {
        selectedBody = value;
        setSelectedBodyButton();
        setSkin();
    }
    
    function setSelectedBodyButton() {
        if (selectedBody == 1) {
            body1.classList.add('selected');
            body2.classList.remove('selected');
        } else if (selectedBody == 2) {
            body2.classList.add('selected');
            body1.classList.remove('selected');
        }    
    }

    /**
     * SKIN
     */
    const sliderSkin = handleSlider('skin', selectedSkin, setSkin);
    handleSliderButtons('skin', sliderSkin, setSkin);

    function setSkin(selected = selectedSkin) {
        selectedSkin = selected;
        document.querySelector('#preview-skin').src = './img/P' + selectedBody + '-Skin' + selected + '.svg';
        document.querySelector('.skin').innerHTML = selected;
        setClothesTop();
        setClothesBottom();
    }

    /**
     * EYES
     */
    const sliderEyes = handleSlider('eyes', selectedEyes, setEyes);
    handleSliderButtons('eyes', sliderEyes, setEyes);
    handleColors('eyecolor', setEyes);
    
    function setEyes(selected = selectedEyes, selectedColor = selectedEyeColor) {
        selectedEyes = selected;
        selectedEyeColor = selectedColor;
        document.querySelector('#preview-eyes').innerHTML = eyes[selected-1];
        document.querySelector('.eyes').innerHTML = selected;
        fillColors('eyecolor', selectedColor);
    }

    /**
     * HAIR
     */
    const sliderHairBack = handleSlider('hair-back', selectedHairBack, setHairBack);
    const sliderHairFront = handleSlider('hair-front', selectedHairFront, setHairFront);
    handleSliderButtons('hair-back', sliderHairBack, setHairBack);
    handleSliderButtons('hair-front', sliderHairFront, setHairFront);
    handleColors('haircolor', setHairBack);
    handleColors('haircolor', setHairFront);
    handleColors('haircolor', setBeard);

    function setHairBack(selected = selectedHairBack, selectedColor = selectedHairColor) {
        selectedHairBack = selected;
        selectedHairColor = selectedColor;
        if (selected < 1) {
            document.querySelector('#preview-hair-back').innerHTML = '';
        } else {
            document.querySelector('#preview-hair-back').innerHTML = hairBack[selected-1];
        }
        document.querySelector('.hair-back').innerHTML = selected;
        setLightenDarkenColors('haircolor', selectedColor);
    }
    
    function setHairFront(selected = selectedHairFront, selectedColor = selectedHairColor) {
        selectedHairFront = selected;
        selectedHairColor = selectedColor;
        document.querySelector('#preview-hair-front').innerHTML = hairFront[selected-1];
        document.querySelector('.hair-front').innerHTML = selected;
        setLightenDarkenColors('haircolor', selectedColor);
    }

    /**
     * GLASSES
     */
    const sliderGlasses = handleSlider('glasses', selectedGlasses, setGlasses);
    handleSliderButtons('glasses', sliderGlasses, setGlasses);
    handleColors('glassescolor-palette', setGlasses);
    
    function setGlasses(selected = selectedGlasses, selectedColor = selectedGlassesColor) {
        selectedGlasses = selected;
        selectedGlassesColor = selectedColor;
        if (selected < 1) {
            document.querySelector('#preview-glasses').innerHTML = '';
        } else {
            document.querySelector('#preview-glasses').innerHTML = glasses[selected-1];
        }
        document.querySelector('.glasses').innerHTML = selected;
        fillColors('glassescolor', selectedColor);
    }
        
    /**
     * BEARD
     */
    const sliderBeard = handleSlider('beard', selectedBeard, setBeard);
    handleSliderButtons('beard', sliderBeard, setBeard);

    function setBeard(selected = selectedBeard, selectedColor = selectedHairColor) {
        selectedBeard = selected;
        selectedHairColor = selectedColor;
        if (selected < 1) {
            document.querySelector('#preview-beard').innerHTML = '';
        } else {
            document.querySelector('#preview-beard').innerHTML = beard[selected-1];
        }
        document.querySelector('.beard').innerHTML = selected;
        setLightenDarkenColors('haircolor', selectedColor);
    }

    /**
     * FACIAL FEATURES
     */
    const checkBoxBlush = document.querySelector('#blush');
    const checkBoxLipColor = document.querySelector('#lip-color');
    const checkBoxFreckles = document.querySelector('#freckles');
    checkBoxBlush.checked = selectedBlush;
    checkBoxLipColor.checked = selectedLips;
    checkBoxFreckles.checked = selectedFreckles;
    setBlush();
    setLipColor();
    setFreckles();
    handleColors('blushcolor-palette', setBlush);
    handleColors('lipcolor-palette', setLipColor);

    checkBoxBlush.addEventListener('change', () => {
        selectedBlush = checkBoxBlush.checked;
        setBlush();
    });

    checkBoxLipColor.addEventListener('change', () => {
        selectedLips = checkBoxLipColor.checked;
        setLipColor();
    });

    checkBoxFreckles.addEventListener('change', () => {
        selectedFreckles = checkBoxFreckles.checked;
        setFreckles();
    });

    function setBlush(selected = selectedBlush, selectedColor = selectedBlushColor) {
        selectedBlush = selected;
        selectedBlushColor = selectedColor;
        if (selected) {
            if (!selectedColor) {
                selectedBlushColor = getRandomColor('.blushcolor-palette', 2);
            }
            document.querySelector('#preview-blush').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="192px" height="384px" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g><path style="opacity:0.5" fill="${selectedBlushColor}" d="M 59.5,119.5 C 65.5,119.5 71.5,119.5 77.5,119.5C 77.5,123.5 77.5,127.5 77.5,131.5C 71.5,131.5 65.5,131.5 59.5,131.5C 59.5,127.5 59.5,123.5 59.5,119.5 Z"/></g>
            <g><path style="opacity:0.5" fill="${selectedBlushColor}" d="M 113.5,119.5 C 119.5,119.5 125.5,119.5 131.5,119.5C 131.5,123.5 131.5,127.5 131.5,131.5C 125.5,131.5 119.5,131.5 113.5,131.5C 113.5,127.5 113.5,123.5 113.5,119.5 Z"/></g>
            </svg>`;
        } else {
            document.querySelector('#preview-blush').innerHTML = '';
        }
    }

    function setLipColor(selected = selectedLips, selectedColor = selectedLipsColor) {
        selectedLips = selected;
        selectedLipsColor = selectedColor;
        if (selectedLips) {
            if (!selectedLipsColor) {
                selectedLipsColor = getRandomColor('.lipcolor-palette', 7);
            }
            document.querySelector('#preview-lips').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="192px" height="384px" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g><path style="opacity:1" fill="${selectedLipsColor}" d="M 83.5,137.5 C 91.5,137.5 99.5,137.5 107.5,137.5C 107.5,139.5 107.5,141.5 107.5,143.5C 99.5,143.5 91.5,143.5 83.5,143.5C 83.5,141.5 83.5,139.5 83.5,137.5 Z"/></g>
            </svg>`;
        } else {
            document.querySelector('#preview-lips').innerHTML = '';
        }
    }

    function setFreckles() {
        if (selectedFreckles) {
            document.querySelector('#preview-freckles').innerHTML = `<img src="./img/Extras-Freckles.svg" alt="preview-freckles" />`;
        } else {
            document.querySelector('#preview-freckles').innerHTML = '';
        }
    }
    
    /**
     * CLOTHES
     */
    const sliderClothesTop = handleSlider('clothes-top', selectedClothesTop, setClothesTop);
    handleSliderButtons('clothes-top', sliderClothesTop, setClothesTop);
    handleColors('clothestopcolor-palette', setClothesTop);
    
    function setClothesTop(selected = selectedClothesTop, selectedColor = selectedClothesTopColor) {
        selectedClothesTop = selected;
        selectedClothesTopColor = selectedColor;
        if (selectedBody == 1) {
            document.querySelector('#preview-clothes-top').innerHTML = p1ClothesTop[selected-1];
        } else {
            document.querySelector('#preview-clothes-top').innerHTML = p2ClothesTop[selected-1];
        }
        document.querySelector('.clothes-top').innerHTML = selected;
        setLightenDarkenColors('clothestopcolor', selectedColor)
    }


    const sliderClothesBottom = handleSlider('clothes-bottom', selectedClothesBottom, setClothesBottom);
    handleSliderButtons('clothes-bottom', sliderClothesBottom, setClothesBottom);
    handleColors('clothesbottomcolor-palette', setClothesBottom);
    handleColors('shoecolor-palette', setShoes);

    function setClothesBottom(selected = selectedClothesBottom, selectedColor = selectedClothesBottomColor) {
        selectedClothesBottom = selected;
        selectedClothesBottomColor = selectedColor;
        if (selectedBody == 1) {
            document.querySelector('#preview-clothes-bottom').innerHTML = p1ClothesBottom[selected-1];
        } else {
            document.querySelector('#preview-clothes-bottom').innerHTML = p2ClothesBottom[selected-1];
        }
        document.querySelector('.clothes-bottom').innerHTML = selected;
        setLightenDarkenColors('clothesbottomcolor', selectedColor);
        setShoes();
    }

    function setShoes(selected = undefined, selectedColor = selectedShoeColor) {
        selectedShoeColor = selectedColor;
        setLightenDarkenColors('shoecolor', selectedColor);
    }

    /**
     * COLORS
     */
    
    function handleColors(className, setFunction) {
        const colors = document.querySelectorAll(`.${className}`);
        colors.forEach(color => {
            color.addEventListener('click', (e) => {
                const selected = document.querySelector(`.${className}.selected`);
                selected?.classList.remove('selected');
                e.target.classList.add('selected');
                const backgroundColor = e.target.style?.backgroundColor;
                setFunction(undefined, backgroundColor);
            });
        })
    }

    function fillColors(className, selectedColor) {
        const colorElements = document.querySelectorAll(`.${className}`);
        colorElements.forEach(element => {
            element.style.fill = selectedColor;
        });
    }

    function setLightenDarkenColors(className, selectedTypeColor) {
        const color1Elements = document.querySelectorAll(`.${className}1`);
        color1Elements.forEach(element => {
            lightenDarkenColor(element, selectedTypeColor, 1);
        });
        const color2Elements = document.querySelectorAll(`.${className}2`);
        color2Elements.forEach(element => {
            lightenDarkenColor(element, selectedTypeColor, 2);
        });
        const color3Elements = document.querySelectorAll(`.${className}3`);
        color3Elements.forEach(element => {
            element.style.fill = selectedTypeColor;
        });
        const color4Elements = document.querySelectorAll(`.${className}4`);
        color4Elements.forEach(element => {
            lightenDarkenColor(element, selectedTypeColor, 4);
        });
    }

    function lightenDarkenColor(element, col, pos) {
        let red = 0;
        let green = 0;
        let blue = 0;

        if (col.startsWith('rgb')) {
            let splits = col.split('(')[1].split(')')[0].split(', ');
            if (pos == 1) {
                splits = splits.map(val => {
                    val = parseInt(val) - 70;
                    if (val < 0) {
                        val = 0;
                    }
                    return val;
                })
                if (splits[0] > splits[2]) {
                    element.style.filter = 'hue-rotate(-40deg)';
                } else {
                    element.style.filter = 'hue-rotate(40deg)';
                }
            } else if (pos == 2) {
                splits = splits.map(val => {
                    val = parseInt(val) - 30;
                    if (val < 0) {
                        val = 0;
                    }
                    return val;
                })
                if (splits[0] > splits[2]) {
                    element.style.filter = 'hue-rotate(-20deg)';
                } else {
                    element.style.filter = 'hue-rotate(20deg)';
                }
            } else if (pos == 4) {
                splits = splits.map(val => {
                    val = parseInt(val) + 40;
                    if (val > 255) {
                        val = 255;
                    }
                    return val;
                })
                splits[0] += 10;
                splits[1] += 10;
            }

            red = splits[0];
            green = splits[1];
            blue = splits[2]
        }

        element.style.fill = 'rgb(' + red + ',' + green + ',' + blue + ')';
    }
    

    /**
     * SLIDER
     */

    function handleSlider(id, selectedType, setFunction) {
        const slider = document.querySelector(`#${id}`);
        slider.value = selectedType || 0;
        setFunction(selectedType);
        slider.addEventListener('change', function() {
            setFunction(this.value);
        });
        return slider;
    }

    function handleSliderButtons(id, sliderType, setFunction) {
        const leftButton = document.querySelector(`#${id}-left`);
        leftButton.addEventListener('click', function() {
            sliderType.value = parseInt(sliderType.value) - 1;
            setFunction(sliderType.value);
        });
        const rightButton = document.querySelector(`#${id}-right`);
        rightButton.addEventListener('click', function() {
            sliderType.value = parseInt(sliderType.value) + 1;
            setFunction(sliderType.value);
        });
    }
    

    /**
     * Accordion
     */
    const details = document.querySelectorAll('details');
    details.forEach(targetDetail => {
        targetDetail.addEventListener('click', () => {
            details.forEach((detail) => {
                if (detail !== targetDetail) {
                    detail.removeAttribute('open');
                }
            });
        });
    });


    /**
     * SAVE IMG
     */
    const nameInput = document.querySelector('#name');
    let characterName = 'Character';
    const photoButton = document.querySelector('#photo');
    photoButton.addEventListener('click', () => {
        if (!cookieConsentSet) {
            cookieDialog.showModal();
            registerCookieConsent();
        }
        if (cookieConsentSet && document.cookie?.includes(consentCookie)) {
            bakeCookies();
        }

        const preview = document.querySelector('#character-preview');
        const transformStyle = preview.style.transform;
        preview.style.transform = 'scale(1)';
        domtoimage.toPng(preview)
            .then((dataUrl) => {
                // const img = new Image();
                // img.src = dataUrl;
                // document.body.appendChild(img);
                const link = document.createElement('a');
                characterName = nameInput.value || characterName;
                link.download = `${characterName}.png`;
                link.href = dataUrl;
                link.click();
                preview.style.transform = transformStyle;
            })
            .catch((error) => {
                console.error('Could not take photo, sorry!', error);
                preview.style.transform = transformStyle;
            });
    });

    function registerCookieConsent() {
        const declineCookie = document.querySelector('#decline-cookie');
        const acceptCookie = document.querySelector('#accept-cookie');
        declineCookie.addEventListener('click', () => {
            cookieConsentSet = true;
            cookieDialog.close();
        })
        acceptCookie.addEventListener('click', () => {
            cookieConsentSet = true;
            document.cookie = consentCookie;
            bakeCookies();
            cookieDialog.close();
        })
    }

    function bakeCookies() {
        document.cookie = `body=${selectedBody}`;
        document.cookie = `skin=${selectedSkin}`;
        document.cookie = `eyes=${selectedEyes}`;
        document.cookie = `eyecolor=${selectedEyeColor}`;
        document.cookie = `glasses=${selectedGlasses}`;
        document.cookie = `glassescolor=${selectedGlassesColor}`;
        document.cookie = `hairback=${selectedHairBack}`;
        document.cookie = `hairfront=${selectedHairFront}`;
        document.cookie = `beard=${selectedBeard}`;
        document.cookie = `haircolor=${selectedHairColor}`;
        document.cookie = `blush=${selectedBlush}`;
        document.cookie = `blushcolor=${selectedBlushColor}`;
        document.cookie = `lips=${selectedLips}`;
        document.cookie = `lipscolor=${selectedLipsColor}`;
        document.cookie = `freckles=${selectedFreckles}`;
        document.cookie = `clothestop=${selectedClothesTop}`;
        document.cookie = `clothestopcolor=${selectedClothesTopColor}`;
        document.cookie = `clothesbottom=${selectedClothesBottom}`;
        document.cookie = `clothesbottomcolor=${selectedClothesBottomColor}`;
        document.cookie = `shoecolor=${selectedShoeColor}`;
    }

    const shareButton = document.querySelector('#share');
    shareButton.addEventListener('click', () => {
        createShareCode();
    })

    function createShareCode() {
        let decodedSettings = `name=${document.querySelector('#name').value || ''}`;
        decodedSettings += `; body=${selectedBody}`;
        decodedSettings += `; skin=${selectedSkin}`;
        decodedSettings += `; eyes=${selectedEyes}`;
        decodedSettings += `; eyecolor=${selectedEyeColor}`;
        decodedSettings += `; glasses=${selectedGlasses}`;
        decodedSettings += `; glassescolor=${selectedGlassesColor}`;
        decodedSettings += `; hairback=${selectedHairBack}`;
        decodedSettings += `; hairfront=${selectedHairFront}`;
        decodedSettings += `; beard=${selectedBeard}`;
        decodedSettings += `; haircolor=${selectedHairColor}`;
        decodedSettings += `; blush=${selectedBlush}`;
        decodedSettings += `; blushcolor=${selectedBlushColor}`;
        decodedSettings += `; lips=${selectedLips}`;
        decodedSettings += `; lipscolor=${selectedLipsColor}`;
        decodedSettings += `; freckles=${selectedFreckles}`;
        decodedSettings += `; clothestop=${selectedClothesTop}`;
        decodedSettings += `; clothestopcolor=${selectedClothesTopColor}`;
        decodedSettings += `; clothesbottom=${selectedClothesBottom}`;
        decodedSettings += `; clothesbottomcolor=${selectedClothesBottomColor}`;
        decodedSettings += `; shoecolor=${selectedShoeColor}`;

        const shareData = {
            title: "I created a pixel art character",
            text: "Check out my character that I just created!",
            url: `${window.location.origin}${window.location.pathname}?character=${btoa(decodedSettings)}`,
        };
        navigator.share(shareData);
    }
});