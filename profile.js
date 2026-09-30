(function () {
    const storageKey = 'kristinePortfolioProfile';
    const defaults = {
        name: 'Kristine',
        background: '#f1e7d6',
        photo: '',
        experiencePhotos: ['', '', ''],
        lovePhotos: ['', '', ''],
        age: '',
        dateOfBirth: '',
        course: '',
        address: '',
        facebook: '',
        instagram: '',
        tiktok: '',
        email: ''
    };
    let profile = { ...defaults, experiencePhotos: [...defaults.experiencePhotos], lovePhotos: [...defaults.lovePhotos] };

    try {
        const saved = JSON.parse(localStorage.getItem(storageKey));
        if (saved && typeof saved === 'object') {
            profile = { ...defaults, ...saved };
            profile.name = typeof profile.name === 'string' && profile.name.trim() ? profile.name.trim() : defaults.name;
            profile.background = /^#[0-9a-f]{6}$/i.test(profile.background) ? profile.background : defaults.background;
            if (profile.background.toLowerCase() === '#fff4fa') profile.background = defaults.background;
            profile.experiencePhotos = Array.isArray(profile.experiencePhotos)
                ? defaults.experiencePhotos.map((_, index) => typeof profile.experiencePhotos[index] === 'string' ? profile.experiencePhotos[index] : '')
                : [...defaults.experiencePhotos];
            profile.lovePhotos = Array.isArray(profile.lovePhotos)
                ? defaults.lovePhotos.map((_, index) => typeof profile.lovePhotos[index] === 'string' ? profile.lovePhotos[index] : '')
                : [...defaults.lovePhotos];
        }
    } catch {
        profile = { ...defaults, experiencePhotos: [...defaults.experiencePhotos], lovePhotos: [...defaults.lovePhotos] };
    }

    const updatePage = () => {
        document.documentElement.style.setProperty('--bg', profile.background);
        document.querySelectorAll('.person-name, .brand-name').forEach((element) => {
            element.textContent = profile.name;
        });

        document.querySelectorAll('[data-profile-photo]').forEach((image) => {
            if (profile.photo) {
                image.src = profile.photo;
                image.hidden = false;
            } else if (image.getAttribute('src')) {
                image.hidden = false;
            } else {
                image.hidden = true;
            }
        });
        document.querySelectorAll('[data-profile-photo-placeholder]').forEach((placeholder) => {
            const image = placeholder.parentElement && placeholder.parentElement.querySelector('[data-profile-photo]');
            placeholder.hidden = Boolean(profile.photo || (image && image.getAttribute('src')));
        });
        document.querySelectorAll('[data-experience-photo]').forEach((image) => {
            const index = Number(image.dataset.experiencePhoto);
            const photo = profile.experiencePhotos[index] || '';
            if (photo) {
                image.src = photo;
                image.hidden = false;
            } else if (image.getAttribute('src')) {
                image.hidden = false;
            } else {
                image.hidden = true;
            }
        });
        document.querySelectorAll('[data-experience-placeholder]').forEach((placeholder) => {
            const index = Number(placeholder.dataset.experiencePlaceholder);
            const image = placeholder.parentElement && placeholder.parentElement.querySelector(`[data-experience-photo="${index}"]`);
            placeholder.hidden = Boolean(profile.experiencePhotos[index] || (image && image.getAttribute('src')));
        });
        document.querySelectorAll('[data-love-photo]').forEach((image) => {
            const index = Number(image.dataset.lovePhoto);
            const photo = profile.lovePhotos[index] || '';
            if (photo) {
                image.src = photo;
                image.hidden = false;
            } else if (image.getAttribute('src')) {
                image.hidden = false;
            } else {
                image.hidden = true;
            }
        });
        document.querySelectorAll('[data-love-placeholder]').forEach((placeholder) => {
            const index = Number(placeholder.dataset.lovePlaceholder);
            const image = placeholder.parentElement && placeholder.parentElement.querySelector(`[data-love-photo="${index}"]`);
            placeholder.hidden = Boolean(profile.lovePhotos[index] || (image && image.getAttribute('src')));
        });
        document.querySelectorAll('[data-profile-visual]').forEach((visual) => {
            visual.classList.toggle('has-photo', Boolean(profile.photo));
        });

        document.querySelectorAll('[data-profile-value]').forEach((element) => {
            const key = element.dataset.profileValue;
            const value = profile[key] || '';
            element.textContent = value || 'Not added yet';
            element.hidden = Boolean(element.dataset.hideWhenEmpty && !value);
        });

        document.querySelectorAll('[data-profile-link]').forEach((link) => {
            const key = link.dataset.profileLink;
            const value = profile[key] || '';
            const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            const validUrl = /^https?:\/\//i.test(value);
            if (key === 'email' && validEmail) {
                link.href = `mailto:${value}`;
            } else if (key !== 'email' && validUrl) {
                link.href = value;
            } else {
                link.removeAttribute('href');
            }
            link.hidden = Boolean(link.dataset.hideWhenEmpty && !(key === 'email' ? validEmail : validUrl));
        });
    };

    const downloadPortfolioInformation = () => {
        const valueOrDefault = (value) => value || 'Not added yet';
        const skills = 'HTML, CSS, JavaScript, PHP, MySQL, C++, C#, Google, Microsoft Word, WPS Office, Microsoft Excel, Microsoft Access, Canva, CapCut';
        const information = [
            `${profile.name}'s Portfolio`,
            '=========================',
            '',
            'PROFILE',
            '-------',
            'Information Technology student and aspiring IT professional focused on web development, design, and practical digital solutions.',
            '',
            'PERSONAL INFORMATION',
            '--------------------',
            `Name: ${valueOrDefault(profile.name)}`,
            `Age: ${valueOrDefault(profile.age)}`,
            `Date of Birth: ${valueOrDefault(profile.dateOfBirth)}`,
            `Course / Year: ${valueOrDefault(profile.course)}`,
            `Address: ${valueOrDefault(profile.address)}`,
            '',
            'EXPERIENCE',
            '----------',
            "Service Crew Member at McDonald's GMA 1010 | Currently employed",
            'Responsibilities include assisting customers, taking and preparing orders, maintaining cleanliness and organization, handling payments, and working with team members to provide efficient and friendly service.',
            'This experience has strengthened communication, teamwork, customer service, time-management, and problem-solving skills.',
            '',
            'EDUCATIONAL BACKGROUND',
            '-----------------------',
            'San Gabriel III Elementary School | 2011 - 2017',
            'General Mariano Alvares Technical High School | 2017 - 2021',
            'My Messiah School of Cavite INC. | 2021 - 2023',
            'Eulogio "Amang" Rodriguez Science and Technology Cavite Campus | 2023 - Present',
            '',
            'SKILLS AND TOOLS',
            '----------------',
            skills,
            '',
            'WHAT I LOVE',
            '-----------',
            'Creating websites that feel friendly, organized, and easy to use; cute visual design; front-end development; and turning simple ideas into working websites.',
            '',
            'PROJECTS',
            '--------',
            '1. Kids Learning System',
            'Microsoft Access database system created during the first year as an IT student. It makes learning fun and interactive by allowing children to learn the alphabet, draw, and listen to songs.',
            '',
            '2. Portfolio',
            'A personal portfolio that showcases skills, projects, experiences, web development, programming, database management, and user interface design.',
            '',
            'CONTACT',
            '-------',
            "Open to freelance opportunities, collaborative projects, and internship opportunities where web development and design skills can be applied.",
            'Phone: 09817549824',
            `Facebook: ${valueOrDefault(profile.facebook)}`,
            `Instagram: ${valueOrDefault(profile.instagram)}`,
            `TikTok: ${valueOrDefault(profile.tiktok)}`,
            `Email: ${valueOrDefault(profile.email)}`
        ].join('\n');

        const file = new Blob([information], { type: 'text/plain;charset=utf-8' });
        const fileUrl = URL.createObjectURL(file);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileUrl;
        downloadLink.download = `${profile.name.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'Kristine'}-Portfolio-Information.txt`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
        URL.revokeObjectURL(fileUrl);
    };

    document.querySelectorAll('[data-download-portfolio]').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            downloadPortfolioInformation();
        });
    });

    document.querySelectorAll('[data-back-button]').forEach((button) => {
        button.addEventListener('click', (event) => {
            if (!document.referrer) return;
            try {
                const previousPage = new URL(document.referrer);
                if (previousPage.origin === window.location.origin) {
                    event.preventDefault();
                    window.history.back();
                }
            } catch {
                return;
            }
        });
    });

    document.querySelectorAll('[data-dialog-open]').forEach((trigger) => {
        const dialog = document.getElementById(trigger.dataset.dialogOpen);
        if (!dialog) return;
        const openDialog = () => dialog.showModal();
        trigger.addEventListener('click', openDialog);
        trigger.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openDialog();
            }
        });
    });

    document.querySelectorAll('.skill-logo img').forEach((image) => {
        const fallback = image.nextElementSibling;
        const updateLogo = () => {
            const loaded = image.complete && image.naturalWidth > 0;
            image.hidden = !loaded;
            if (fallback) fallback.hidden = loaded;
        };
        image.addEventListener('load', updateLogo);
        image.addEventListener('error', updateLogo);
        updateLogo();
    });

    document.querySelectorAll('[data-dialog-close]').forEach((button) => {
        const dialog = button.closest('dialog');
        if (dialog) {
            button.addEventListener('click', () => dialog.close());
        }
    });

    document.querySelectorAll('dialog[data-about-dialog]').forEach((dialog) => {
        dialog.addEventListener('click', (event) => {
            if (event.target === dialog) dialog.close();
        });
    });

    const showSaveStatus = (message) => {
        const status = document.querySelector('#save-status');
        if (status) status.textContent = message;
    };

    const persistProfile = () => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(profile));
            showSaveStatus('Changes saved');
            return true;
        } catch {
            showSaveStatus('Could not save. Try a smaller photo.');
            return false;
        }
    };

    updatePage();

    const nameInput = document.querySelector('#profile-name');
    const colorInput = document.querySelector('#profile-background');
    if (nameInput && colorInput) {
        nameInput.value = profile.name;
        colorInput.value = profile.background;

        document.querySelectorAll('[data-profile-input]').forEach((input) => {
            input.value = profile[input.dataset.profileInput] || '';
        });

        document.querySelectorAll('[data-profile-photo]').forEach((image) => {
            if (profile.photo) image.src = profile.photo;
        });
        document.querySelectorAll('[data-experience-photo-input]').forEach((input) => {
            const index = Number(input.dataset.experiencePhotoInput);
            const preview = document.querySelector(`[data-experience-preview="${index}"]`);
            if (preview && profile.experiencePhotos[index]) preview.src = profile.experiencePhotos[index];
        });
        document.querySelectorAll('[data-love-photo-input]').forEach((input) => {
            const index = Number(input.dataset.lovePhotoInput);
            input.addEventListener('change', async () => {
                const file = input.files && input.files[0];
                if (!file) return;
                if (!file.type.startsWith('image/')) {
                    showSaveStatus('Choose an image file.');
                    input.value = '';
                    return;
                }
                try {
                    profile.lovePhotos[index] = await compressImage(file);
                    updatePage();
                    persistProfile();
                } catch {
                    showSaveStatus('Could not read that image.');
                }
            });
        });

        const saveProfile = () => {
            profile.name = nameInput.value.trim() || defaults.name;
            profile.background = colorInput.value;
            document.querySelectorAll('[data-profile-input]').forEach((input) => {
                profile[input.dataset.profileInput] = input.value.trim();
            });
            updatePage();
            persistProfile();
        };

        nameInput.addEventListener('input', saveProfile);
        colorInput.addEventListener('input', saveProfile);
        document.querySelectorAll('[data-profile-input]').forEach((input) => {
            input.addEventListener('input', saveProfile);
        });

        const photoInput = document.querySelector('#profile-photo-input');
        if (photoInput) {
            photoInput.addEventListener('change', () => {
                const file = photoInput.files && photoInput.files[0];
                if (!file) return;
                if (!file.type.startsWith('image/')) {
                    showSaveStatus('Choose an image file.');
                    photoInput.value = '';
                    return;
                }

                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    const source = new Image();
                    source.addEventListener('load', () => {
                        const scale = Math.min(1, 800 / Math.max(source.width, source.height));
                        const canvas = document.createElement('canvas');
                        canvas.width = Math.round(source.width * scale);
                        canvas.height = Math.round(source.height * scale);
                        canvas.getContext('2d').drawImage(source, 0, 0, canvas.width, canvas.height);
                        profile.photo = canvas.toDataURL('image/jpeg', 0.72);
                        updatePage();
                        persistProfile();
                    });
                    source.addEventListener('error', () => showSaveStatus('Could not read that image.'));
                    source.src = reader.result;
                });
                reader.addEventListener('error', () => showSaveStatus('Could not read that image.'));
                reader.readAsDataURL(file);
            });
        }

        const removePhoto = document.querySelector('#remove-profile-photo');
        if (removePhoto) {
            removePhoto.addEventListener('click', () => {
                profile.photo = '';
                photoInput.value = '';
                updatePage();
                persistProfile();
            });
        }

        const compressImage = (file) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                const source = new Image();
                source.addEventListener('load', () => {
                    const scale = Math.min(1, 640 / Math.max(source.width, source.height));
                    const canvas = document.createElement('canvas');
                    canvas.width = Math.round(source.width * scale);
                    canvas.height = Math.round(source.height * scale);
                    const context = canvas.getContext('2d');
                    if (!context) {
                        reject(new Error('Image canvas unavailable'));
                        return;
                    }
                    context.drawImage(source, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL('image/jpeg', 0.68));
                });
                source.addEventListener('error', () => reject(new Error('Could not read that image')));
                source.src = reader.result;
            });
            reader.addEventListener('error', () => reject(new Error('Could not read that image')));
            reader.readAsDataURL(file);
        });

        document.querySelectorAll('[data-experience-photo-input]').forEach((input) => {
            const index = Number(input.dataset.experiencePhotoInput);
            input.addEventListener('change', async () => {
                const file = input.files && input.files[0];
                if (!file) return;
                if (!file.type.startsWith('image/')) {
                    showSaveStatus('Choose an image file.');
                    input.value = '';
                    return;
                }
                try {
                    profile.experiencePhotos[index] = await compressImage(file);
                    updatePage();
                    persistProfile();
                } catch {
                    showSaveStatus('Could not read that image.');
                }
            });
        });

        document.querySelectorAll('[data-remove-experience-photo]').forEach((button) => {
            button.addEventListener('click', () => {
                const index = Number(button.dataset.removeExperiencePhoto);
                profile.experiencePhotos[index] = '';
                const input = document.querySelector(`[data-experience-photo-input="${index}"]`);
                if (input) input.value = '';
                updatePage();
                persistProfile();
            });
        });
        document.querySelectorAll('[data-remove-love-photo]').forEach((button) => {
            button.addEventListener('click', () => {
                const index = Number(button.dataset.removeLovePhoto);
                profile.lovePhotos[index] = '';
                const input = document.querySelector(`[data-love-photo-input="${index}"]`);
                if (input) input.value = '';
                updatePage();
                persistProfile();
            });
        });

        document.querySelectorAll('[data-color]').forEach((button) => {
            button.addEventListener('click', () => {
                colorInput.value = button.dataset.color;
                saveProfile();
            });
        });

        document.querySelector('#reset-profile').addEventListener('click', () => {
            nameInput.value = defaults.name;
            colorInput.value = defaults.background;
            document.querySelectorAll('[data-profile-input]').forEach((input) => {
                input.value = '';
            });
            profile = { ...defaults, experiencePhotos: [...defaults.experiencePhotos], lovePhotos: [...defaults.lovePhotos] };
            if (photoInput) photoInput.value = '';
            document.querySelectorAll('[data-experience-photo-input]').forEach((input) => {
                input.value = '';
            });
            document.querySelectorAll('[data-love-photo-input]').forEach((input) => {
                input.value = '';
            });
            updatePage();
            persistProfile();
        });
    }
})();