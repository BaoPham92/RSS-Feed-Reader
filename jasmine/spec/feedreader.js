$(function() {

    // A suite representing tests for app.js > allFeeds obj (.url && .name) === defined && not empty.
    describe('RSS Feeds', function() {

        // Spec testing if app.js > allFeeds obj === defined && not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Spec testing if (.url) prop is defined && (.url) prop not empty.
        it('URL is defined, not empty.', function() {

            allFeeds.forEach((feed)=> {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            })
        })

        // Spec testing if (.name) prop is defined && (.name) prop not empty.
        it('name is defined, not empty.', function () {

            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        })
    });

    // A suite representing tests for menu logic css logic.
    describe('The menu', function() {

        let menu = document.querySelector('body');

        // Spec testing if (menu) === hidden || not.
        it('should be able to hide menu by default.', function() {

            expect(menu.classList.contains('menu-hidden')).toBe(true);
        })

        // Spec testing if (menu display) === true || false
        it('should be able to ensure menu visibility when clicking menu icon.', function() {
            let icon = document.querySelector('.menu-icon-link');

            icon.click();
            expect(menu.classList.contains('menu-hidden')).not.toBe(true);

            icon.click();
            expect(menu.classList.contains('menu-hidden')).toBe(true);
        })
    })

        // A suite for testing min of 1 entry link loaded by a feed.
         describe('Initial Entries',function() {

            beforeEach(function(done) {
                loadFeed(0, done);
            })

            // Spec testing if feed has been loaded.
            it('should be able to load feed.', function() {
                let feed = document.querySelectorAll('.feed .entry');
                console.log(`Current loaded data with an amount of items containing (.entry) class.`, feed);

                expect(feed.length).toBeGreaterThan(0);
            })
         })


         // A suite testing for new/previous feed entries.
        describe('New Feed Selection', function() {

            let feed = document.querySelector('.feed').children;
            // console.log(feed); // Confirmination message to console.

            let container1 = [], container2 = [];
            
            // Storage for feeds.

            // Compare & get methods are for testing purposes only.
            let localStorage = {
                store: (name, variable) => {
                    window.localStorage.setItem(name, Array.from(feed).map(function (index) {
                        variable.push(index.textContent.trim());
                    }));
                },

                get: (variable) => { console.log(variable);
                },

                compare: (toBeCompared) => {
                    console.log(`Comparing the array values using the (array.values()) method:`, container1.values() === toBeCompared.values());
                }
            }

            // Have a asyn call func for loadFeed, store previous/last feed in container variables.
            beforeEach(function (done) {

                loadFeed(0, function () {

                    localStorage.store('feed0', container1); // Store feed indexOf(0) from app.js > allFeeds obj.
                    console.log(container1);

                    loadFeed(1, function() {
                        localStorage.store('feed1', container2); // Store feed indexOf(1) from app.js > allFeeds obj.

                        done(); // cb
                    })
                    
                })
            })

            // Spec setting expectations/tests for old/previous feed entries for changes.
            it('should be able to change content.', function() {

                // Comparison for the previous and latest feed comparison in console.
                localStorage.store('feed1', container2), localStorage.get(container2), localStorage.compare(container2);

                expect(container1 === container2).not.toBe(true);
            })
         })
}());
