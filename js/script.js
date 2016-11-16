    var request = new XMLHttpRequest();

    var url = "./map.json";
    request.open("GET", url, false);
    request.send();

    var myArr = JSON.parse(request.responseText);

    var map;
    function initMap() {

        var startMapCenter = {lat: 49.685783, lng: 31.623217};
        map = new google.maps.Map(document.getElementById('map'), {
            center: startMapCenter,
            zoom: 6
        });


        myArr.forEach(function (item) {
            var latLng = {lat: item[1], lng:item[2]};
            var image = 'img/circle1.png';
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: image,
                title: item[4]
            });

            marker.addListener('click', function() {
                map.setZoom(12);
                map.setCenter(marker.getPosition());

            });


        });

    }


    var shopList = document.getElementById('shop-list');


    function createShopList() {
        myArr.forEach(function (item) {
            var shop = document.createElement('div');
            shop.classList.add('shop');
            shop.classList.add(item[3]);
            shop.classList.add('hide');
            var title = document.createElement('span');
            title.innerHTML = item[0];
            title.classList.add('title');
            shop.appendChild(title);
            var address = document.createElement('p');
            address.innerHTML = item[4];
            address.classList.add('address');
            shop.appendChild(address);
            var workTime = document.createElement('p');
            workTime.innerHTML = item[5];
            workTime.classList.add('work-time');
            shop.appendChild(workTime);
            shopList.appendChild(shop);
        });
    }

    createShopList();

    var shops = document.getElementsByClassName('shop');

    function loadShops(region) {

        for (var i = 0; i < shops.length; i ++) {

            if (shops[i].classList[1] != region) {
                shops[i].classList.add('hide');
            }

            if (shops[i].classList[1] == region) {
                shops[i].classList.remove('hide');
                myArr.forEach(function (item) {

                    if (item[4] == shops[i].children[1].innerHTML) {
                        shops[i].addEventListener('click', function () {
                            map.setZoom(12);
                            var markerPosition = {lat: item[1], lng: item[2]};
                            map.setCenter(markerPosition);
                        });
                    }
                });

            }
        }
    }
