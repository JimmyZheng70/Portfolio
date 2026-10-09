document.addEventListener('DOMContentLoaded', () => {
    const galleries = document.querySelectorAll('.screenshot-gallery');

    galleries.forEach((gallery) => {
        const buttons = Array.from(gallery.querySelectorAll('.screenshot-button'));
        if (!buttons.length) {
            return;
        }

        gallery.setAttribute('tabindex', '0');

        gallery.addEventListener('keydown', (event) => {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
                return;
            }

            const activeButton = event.target.closest('.screenshot-button');
            const currentIndex = activeButton ? buttons.indexOf(activeButton) : -1;
            const nextIndex = currentIndex === -1
                ? 0
                : (currentIndex + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;

            event.preventDefault();
            buttons[nextIndex].focus();
        });

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const dialog = gallery.parentElement.querySelector('.screenshot-dialog');
                if (!dialog) {
                    return;
                }

                const preview = dialog.querySelector('.screenshot-preview');
                const closeButton = dialog.querySelector('.close-screenshot');
                if (!preview || !closeButton) {
                    return;
                }

                preview.src = button.dataset.image;
                preview.alt = button.querySelector('img')?.alt || '';
                dialog.showModal();

                closeButton.onclick = () => dialog.close();
                dialog.onclick = (event) => {
                    if (event.target === dialog) {
                        dialog.close();
                    }
                };
            });
        });
    });
});