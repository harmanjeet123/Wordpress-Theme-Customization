
jQuery(document).ready(function ($) {
    // $(".centurygothic").find("a").addClass("inactive");
    jQuery('.next-btn.centurygothic.active').click(function () {
        e.preventDefault();
        window.scrollTo(0, 200);
        // alert("centurygothic");
    });
    

    var value = $("input[type=radio][name=attribute_kippah-material]:checked").val();
    // alert(value);
    if (value == 'Suede') {
        $('.typeface-catunderbox').css("display", "none");
        $('.extra_variation_group p span.all-mat').hide();
        $('.extra-variation-catunderbox #label_86').hide();
        $('.extra-variation-catunderbox.x-large-qty-catunderbox').hide();
        $('.extra-variation-catunderbox #label_6 input[type=radio]').attr('data-id', '0.44');
        $('.extra-variation-catunderbox #label_6 input[type=radio]').attr('id', '0.44');
        $('.extra-variation-catunderbox #label_6 price').text('+$0.44');

        // $('.extra_variation_group#rush input[type=checkbox].rush_picked').attr('data-id','25');
        // $('.extra_variation_group#rush input[type=checkbox].rush_picked').attr('id','25');
        // $('.extra_variation_group#rush label span').text('Yes, please add $25 to my order total for rush processing.');

    }
    if (value == 'Crushed Velvet') {
        $('.extra-variation-catunderbox #label_147').hide();
        $('.extra-variation-catunderbox #label_148').hide();
    }
    if (value == "Mesh") {
        $('.steps .trimcolor-crumb').hide();
    }
    $('.extra-variation-catunderbox #label_155').hide();
    $('.extra-variation-catunderbox #label_147').hide();
    $('.extra-variation-catunderbox #label_148').hide();
    $('#rush .extra-variation-catunderbox').hide();

    $("#sizeing h5").text("SIZE");
    $("#sizeing1 h5").text("SIZE");
    $("#sizeing2 h5").text("SIZE");


    $('.switch-wrap1').next('.extra-variation-catundertab').hide();
    var embroideredValue = '';
    var total_steps = $("ul.steps li").length;
    var pwidth = $('#mk-theme-container').width();
    if (pwidth > 768) {
        $('ul.steps>li').css('width', Math.floor(100 / total_steps) + '%');
    }

    var renderer, lining, light, light2, light3, light4, spotLight, scene, camera, color1, color2, color3, controls, group, trimcolor, emboss_pattern, loader, topTrim, texture, texture2, trimtexture,
        myCanvas = document.getElementById('myCanvas');
    var dtrimcolor = theme.url + '/materials/flat-white.jpg';
    var dcolor1 = theme.url + '/materials/flat-white.jpg';
    var dcolor2 = theme.url + '/materials/flat-white.jpg';
    var dcolor3 = theme.url + '/materials/white.jpg';

    var tTrim = theme.url + '/materials/flat-white.jpg';
    var embroidered_logo = '';
    var embroidered_map = '';
    var embroidered_dmap = '';
    var is_suede_trim;
    var fontType = 'Times New Roman';
    var personaltext = "";
    var textColor = 0x000000;
    var panel_layout;
    var panel1;
    var panel2;
    var panel3;
    var panel4, trim, thread, pattern, lining_color, undercloth_fabric, color_emboss, emboss_mesh1, emboss_mesh2, emboss_mesh3, emboss_mesh4;
    var topTrimColor;
    var with_toptrim = $('#extra_toptrim').val();
    var patterncolor = "";

    function renderKippah() {

        color1 = color1 ? color1 : dcolor1;
        color2 = color2 ? color2 : dcolor2;
        color3 = color3 ? color3 : dcolor3;
        lining_color = lining_color ? lining_color : dcolor3;
        topTrimColor = topTrimColor ? topTrimColor : color1;
        trimcolor = trimcolor ? trimcolor : dtrimcolor;

        embroidered_logo = embroidered_logo ? embroidered_logo : "";
        emboss_pattern = emboss_pattern ? emboss_pattern : "";

        //RENDERER
        renderer = new THREE.WebGLRenderer({
            preserveDrawingBuffer: true,
            canvas: myCanvas,
            antialias: true,
        });
        var bulbs = 0.6;
        var heat = 700;
        if (fabric == 'raw silk') {
            bulbs = 0.8;
            heat = 800;
        }

        renderer.setClearColor(0xffffff);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(345, 345);
        if (pwidth < 768) {
            renderer.setSize(245, 245);
        }


        //renderer.shadowMap.enabled = true;
        //renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        camera = new THREE.PerspectiveCamera(35, 345 / 345, 1, 10000);
        //camera.position.set( -350, 20, 50 );
        camera.position.set(-200, 100, 1);
        //SCENE
        scene = new THREE.Scene();

        var light = new THREE.AmbientLight(0xcccccc, 0.8);
        scene.add(light);

        light2 = new THREE.PointLight(0xffffff, bulbs, heat);

        light2.position.x = -200;
        light2.position.y = 150;
        light2.position.z = -100;

        //light2.position.set( 180, 100, -400 );
        light2.castShadow = true;

        light3 = new THREE.PointLight(0xffffff, bulbs, heat);
        light3.position.x = 100;
        light3.position.y = 150;
        light3.position.z = 100;
        //light3.position.set( -180, 100, 400 );
        light3.castShadow = true;

        //bottom of model 
        light4 = new THREE.PointLight(0xffffff, 0.5, 500);
        light4.position.x = 0;
        light4.position.y = -150;
        light4.position.z = 20;
        light4.castShadow = false;

        loader = new THREE.TextureLoader();
        texture = loader.load(color1);
        texture2 = loader.load(color2);
        trimtexture = loader.load(trimcolor);
        trimtexture.wrapS = trimtexture.wrapT = THREE.RepeatWrapping;
        trimtexture.repeat.set(1, 1);

        texture2.rotation = 0;
        texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;


        //undercloth
        undercloth_fabric = loader.load(lining_color);

        var material5 = new THREE.MeshPhongMaterial({
            map: undercloth_fabric,
            side: THREE.BackSide,
            transparent: true,
            opacity: 1,
        });
        var geometry5 = new THREE.SphereBufferGeometry(56.2, 32, 32, 0, 6.3, 0, 1.1);
        lining = new THREE.Mesh(geometry5, material5);
        lining.position.z = 0;
        lining.position.x = 0;
        lining.position.y = -12.5;
        lining.scale.set(1, 0.7, 1);
        lining.name = 'lining';

        group = new THREE.Group();

        group.add(lining);

        var gtloader = new THREE.GLTFLoader();
        gtloader.load(theme.url + '/js/kippah.glb', function (gltf4) {


            trim = gltf4.scene.getObjectByName("trim");
            trim.material.map = trimtexture;
            trim.castShadow = true;
            trim.scale.set(50, 50, 50);
            trim.position.y = 1;

            panel1 = gltf4.scene.getObjectByName("panel1");
            panel1.material.map = texture;
            panel1.material.bumpMap = texture;
            panel1.material.bumpScale = 4;
            panel1.scale.set(50, 50, 50);
            panel1.material.roughness = 1;
            panel1.castShadow = true;
            panel1.receiveShadow = true;
            panel1.material.side = THREE.FrontSide;

            panel2 = gltf4.scene.getObjectByName("panel2");
            panel2.material.map = texture2;
            panel2.material.bumpMap = texture2;
            panel2.material.bumpScale = 4;
            panel2.scale.set(50, 50, 50);
            panel2.material.roughness = 1;
            panel2.castShadow = true;
            panel2.receiveShadow = true;
            panel2.material.side = THREE.FrontSide;

            panel3 = gltf4.scene.getObjectByName("panel3");
            panel3.material.map = texture;
            panel3.material.bumpMap = texture;
            panel3.material.bumpScale = 4;
            panel3.scale.set(50, 50, 50);
            panel3.material.roughness = 1;
            panel3.castShadow = true;
            panel3.receiveShadow = true;
            panel3.material.side = THREE.FrontSide;

            panel4 = gltf4.scene.getObjectByName("panel4");
            panel4.material.map = texture2;
            panel4.material.bumpMap = texture2;
            panel4.material.bumpScale = 4;
            panel4.scale.set(50, 50, 50);
            panel4.material.roughness = 1;
            panel4.castShadow = true;
            panel4.receiveShadow = true;
            panel4.material.side = THREE.FrontSide;





            group.add(trim);

            group.add(panel1);
            group.add(panel2);
            group.add(panel3);
            group.add(panel4);


            if (with_toptrim) {
                topTrim = addTopTrim(color1, is_suede_trim);
                group.add(topTrim);
            }

            emboss_mesh1 = panel1.clone();
            emboss_mesh1.position.y = 0.1;
            emboss_mesh1.name = 'emboss_mesh1';
            emboss_mesh1.material = panel1.material.clone();
            emboss_mesh1.visible = false;

            emboss_mesh2 = panel2.clone();
            emboss_mesh2.position.y = 0.1;
            emboss_mesh2.name = 'emboss_mesh2';
            emboss_mesh2.material = panel2.material.clone();
            emboss_mesh2.visible = false;

            emboss_mesh3 = panel3.clone();
            emboss_mesh3.position.y = 0.1;
            emboss_mesh3.name = 'emboss_mesh3';
            emboss_mesh3.material = panel3.material.clone();
            emboss_mesh3.visible = false;

            emboss_mesh4 = panel4.clone();
            emboss_mesh4.position.y = 0.1;
            emboss_mesh4.name = 'emboss_mesh4';
            emboss_mesh4.material = panel4.material.clone();
            emboss_mesh4.visible = false;

            group.add(emboss_mesh1);
            group.add(emboss_mesh2);
            group.add(emboss_mesh3);
            group.add(emboss_mesh4);

        });

        scene.add(light2);
        scene.add(light3);
        scene.add(light4);

        scene.add(group);

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = true;

        controls.rotateSpeed = 0.8;
        controls.maxDistance = 200;
        controls.minDistance = 180;
        controls.update();

        render();

    }


    var delta = 0;
    function render() {

        requestAnimationFrame(render);

        renderer.render(scene, camera);

        //var strMime = "image/jpeg";
        //        imgData = renderer.domElement.toDataURL(strMime);
        //        console.log(imgData);
        //window.open( renderer.domElement.toDataURL( 'image/png' ), 'screenshot' );
    }

    function addPersonalizedText(personaltext, fontType, txtColor) {

        $('#bounce-loader').show();
        group.remove(group.getObjectByName('personalText'));

        camera.position.set(-10, -200, 1);
        controls.update();
        //console.log(txtColor);

        var textColor = convertFontColor(txtColor);
        //console.log('hello',textColor); 
        //textColor = decimalToHex( textColor );
        //textColor = new THREE.Color( textColor );
        var fontSize = 1.5;
        var fontloader = new THREE.FontLoader();

        if (fontType == 'AllHebrew') {
            fontType = 'Rubik';
        }
        //console.log(textColor);
        switch (fontType) {
            case 'Freshman': fontSize = 2; break;
            case 'CenturyGothic': fontSize = 1.5; break;
            case 'BrushScript': fontSize = 1.5; break;
            case 'AllHebrew': fontSize = 4; break;
            default: fontSize = 2; break;
        }

        fontloader.load(
            // resource URL
            theme.url + '/fonts/' + fontType + '.json',

            // onLoad callback
            function (font) {
                // do something with the font
                var txtgeometry = new THREE.TextGeometry(personaltext, {
                    font: font,
                    size: fontSize,
                    height: 0,
                    curveSegments: 10,
                    bevelEnabled: false,
                    bevelThickness: 0,
                    bevelSize: 0,
                    bevelSegments: 0,
                });
                txtgeometry.center();
                txtgeometry.computeBoundingBox();
                var bb = txtgeometry.boundingBox;
                var object3DWidth = bb.max.x - bb.min.x;

                var txtmaterial = new THREE.MeshLambertMaterial({
                    depthWrite: true,
                    depthTest: true,
                    side: THREE.FrontSide,
                    color: textColor
                });


                var textGeo = new THREE.Mesh(txtgeometry, txtmaterial);
                textGeo.position.z = 0;
                textGeo.position.x = 0;
                textGeo.position.y = 0;
                textGeo.rotation.z = 0;
                textGeo.rotation.x = 0.75;
                textGeo.rotation.y = 0;
                textGeo.name = 'personalText';
                textGeo.castShadow = false;

                var direction = new THREE.Vector3(0, 0.6, 1);
                var axis = new THREE.Vector3(0, 1, 0);
                var angle = object3DWidth / 120;

                var modifier = new THREE.BendModifier();
                modifier.set(direction, axis, angle).modify(textGeo.geometry);

                //textGeo.material.color.setStyle(textColor);
                //textGeo.needsUpdate = true;
                group.add(textGeo);
                $('#bounce-loader').hide();
            },

            // onProgress callback
            function (xhr) {

            },

            // onError callback
            function (err) {
                $.alert({
                    title: 'Error',
                    content: 'Font not found!',
                    boxWidth: '300px',
                    useBootstrap: false,
                    type: 'dark'
                });
            }
        );



    }

    function convertFontColor(fcolor) {

        var hexcolor = "";
        var fcolor = fcolor.toLowerCase().trim();



        if (fcolor == "silver") { hexcolor = "#999999"; }
        if (fcolor == "gold") { hexcolor = "#E3B601"; }
        if (fcolor == "black") { hexcolor = "#000000"; }
        if (fcolor == "virdian") { hexcolor = "#058266"; }
        if (fcolor == "green") { hexcolor = "#00A614"; }
        if (fcolor == "slate-gray") { hexcolor = "#777777"; }
        if (fcolor == "carmine") { hexcolor = "#770B2E"; }
        if (fcolor == "light-blue") { hexcolor = "#4FAED5"; }
        if (fcolor == "cardinal") { hexcolor = "#DD0000"; }
        if (fcolor == "orange") { hexcolor = "#F37200"; }
        if (fcolor == "pink") { hexcolor = "#D985C2"; }
        if (fcolor == "grey") { hexcolor = "#777777"; }
        if (fcolor == "steel-blue") { hexcolor = "#476CAC"; }
        if (fcolor == "khaki") { hexcolor = "#A89A7F"; }
        if (fcolor == "royal-blue") { hexcolor = "#002EC3"; }
        if (fcolor == "navy-blue") { hexcolor = "#273173"; }
        if (fcolor == "dark-tan") { hexcolor = "#6A5B39"; }
        if (fcolor == "burgundy") { hexcolor = "#9A0041"; }
        if (fcolor == "yellow") { hexcolor = "#FFF700"; }
        if (fcolor == "white") { hexcolor = "#FFFFFF"; }


        return hexcolor;
    }
    function decimalToHex(d) {

        let hex = Number(d).toString(16);
        hex = "000000".substr(0, 6 - hex.length) + hex;
        return hex.toUpperCase();

    }

    function removeObject(id) {
        scene.remove(scene.getObjectByName(id));
    }

    function addLogo(embroidered_logo) {
        camera.position.set(-200, 100, 1);
        controls.update();
        group.remove(group.getObjectByName('Logo'));
        var logotexture = loader.load(embroidered_logo);

        // var logomap = loader.load(embroidered_map);
        //var logodmap = loader.load(embroidered_dmap);
        logotexture.center.set(0, 0);
        logotexture.repeat.set(1, 1);
        logotexture.minFilter = THREE.LinearFilter;
        logotexture.wrapS = THREE.ClampToEdgeWrapping;
        logotexture.wrapT = THREE.ClampToEdgeWrapping;
        logotexture.offset.set(0, 0);
        //logotexture.needsUpdate = true;
        var logomaterial = new THREE.MeshPhongMaterial({
            map: logotexture,
            side: THREE.FrontSide,
            bumpMap: logotexture,
            bumpScale: 5,
            transparent: true,
            opacity: 1,
            depthWrite: true,
            depthTest: true
        });

        var logogeometry = new THREE.SphereBufferGeometry(56.2, 32, 32, 0.5, 0.6, 0.6, 0.4);
        logo = new THREE.Mesh(logogeometry, logomaterial);
        logo.position.z = 0;
        logo.position.x = 0;
        logo.position.y = -10.9;
        logo.receiveShadow = false;
        logo.castShadow = false;
        logo.scale.set(1, 0.7, 1);
        logo.name = 'Logo';



        return logo;
    }

    function addTopTrim(topTrimColor, is_suede_trim = false) {

        //trim        

        var group = new THREE.Group();
        var texture3 = loader.load(topTrimColor);

        texture3.rotation = Math.PI / 2;
        texture3.wrapS = THREE.RepeatWrapping;
        texture3.wrapT = THREE.RepeatWrapping;
        if (is_suede_trim == true) {
            texture3.repeat.set(1, 17.2);
        } else {
            texture3.repeat.set(1, 1);
            texture3.offset.set(0, 0);
        }

        texture3.center.set(0, 0);
        texture3.minFilter = THREE.NearestFilter;

        var material3 = new THREE.MeshPhongMaterial({
            map: texture3,
            skinning: true,
            bumpMap: texture3,
            side: THREE.FrontSide,
            bumpScale: 1,
            transparent: true,
            opacity: 1,
            roughness: 1,
            metalness: 0,
            depthWrite: true,
            depthTest: true,
            shininess: 1,
            receiveShadow: true,
            castShadow: true,
        });

        var stringMap = loader.load(color1);
        var geometry1 = new THREE.TorusBufferGeometry(89.5, 1, 30, 200, 1.85);

        var topTrim = new THREE.Mesh(geometry1, material3);
        topTrim.position.x = 0;
        topTrim.position.z = 0;
        topTrim.position.y = -42;
        topTrim.rotation.z = 0.655;
        topTrim.rotation.y = Math.PI / 2;
        topTrim.rotation.x = 0;
        topTrim.receiveShadow = true;
        var topTrim_clone = topTrim.clone();
        topTrim_clone.position.x = 0.8;


        group.add(topTrim);
        group.add(topTrim_clone);

        var topTrim2 = new THREE.Mesh(geometry1, material3);
        topTrim2.position.x = 0;
        topTrim2.position.z = 0;
        topTrim2.position.y = -42;
        topTrim2.rotation.z = 0.655;
        topTrim2.rotation.y = 0;
        topTrim2.rotation.x = 0;
        topTrim2.receiveShadow = true;

        var topTrim2_clone = topTrim2.clone();
        topTrim2_clone.position.z = 0.8;


        group.add(topTrim2);
        group.add(topTrim2_clone);

        group.name = 'TopTrim';

        group.castShadow = true;
        group.scale.set(0.695, 0.6, 0.695);

        return group;
    }

    function changeskin(color, val) {

        switch (color) {
            case 1: fabric = 'materials/' + val;
                break;
            case 2: color1 = val;
                break;
            case 3: color2 = val;
                break;
            case 4: trimcolor = val;
                break;
        }

        renderKippah();
        return false;
    }


    var material_name;
    var min_qty;

    function load_material(material_name) {
        var material = theme.url + '/materials/flat-white.jpg';
        min_qty = $(this).data('min_qty');
        color1 = material;
        color2 = material;
        color3 = material;
        trimcolor = material;
        $('#kippah-material').val($(this).val());

        getColor1(material_name);
        getColor2(material_name);
        getColorTrim(material_name);
        renderKippah();

        $('#panel-layout input[type=radio]:checked').removeAttr('checked');

    }

    if ($('#panel-layout input[type=radio]:checked')) {
        $('.next-btn').addClass('active');
    }

    $(document).on('change', '#panel-layout input[type=radio]', function () {
        // alert("#panel-layout");
        var material = theme.url + '/materials/flat-white.jpg';
        color1 = material;
        color2 = material;
        color3 = material;
        trimcolor = material;

        $('#color-1 input[type=radio]:checked').removeAttr('checked');
        $('#color2 input[type=radio]:checked').removeAttr('checked');
        $('#trim-color input[type=radio]:checked').removeAttr('checked');

        var value = $(this).data('value');
        var name = $(this).data('name');
        var price = $(this).data('id');
        var cat = $(this).data('cat');
        panel_layout = value;
        selected_panel = $(this);
        // $('#order-summary').find('.panel-layout').html('<strong>Panel Layout:</strong> '+panel_layout+' - '+price);
        $('#order-summary').find('.panel-layout').html('<strong>Panel Layout:</strong> ' + panel_layout);
        $('.next-btn>a').addClass('active');

        $('#open-btn').remove();
        var panel_selected = "";
        if (value == 'Single Color') {
            panel_selected = '<img src="' + color1 + '" class="panel1"/>';
        } else {
            panel_selected = '<img src="' + color1 + '" class="panel1"/> <span class="plus-icon">+</span> <img src="' + color2 + '" class="panel2"/>';
        }

        $('.panel-selected').html(panel_selected).hide();

        renderKippah();


    });

    $(document).on('change', '#color-1 input[type=radio]', function (e) {
        // alert("#color-1");
        e.preventDefault();

        var value = $(this).val();
        var name = $(this).data('name');
        var price = $(this).data('id');
        var cat = $(this).data('cat');
        var var_class = $(this).closest('.extra_variation_group').attr('id');
        var img = $(this).closest('.extra-variation-radio').find('img');

        $('#order-summary').find('.' + var_class).html('<strong>' + cat + ':</strong> ' + value);

        //window.localStorage.setItem('cs_price', value);

        color1 = img.attr('src');
        color2 = dcolor2;
        color3 = dcolor3;

        $("#color-2 input[type=radio]").each(function (i, e) {
            // alert("#color-2");
            $(e).checked = false;
        });

        $("#trim-color input[type=radio]").each(function (i, e) {
            // alert("#trim-color");
            $(e).checked = false;
        });

        $("#top-trim input[type=radio]").each(function (i, e) {
            // alert("#top-trim");
            $(e).checked = false;
        });

        $("#emboss input[type=radio]").each(function (i, e) {
            // alert("#emboss");
            $(e).checked = false;
        });

        if (panel_layout == 'Single Color') {
            // alert("hello");
            //color1 = img.attr('src');
            color2 = color1;
            color3 = color1;
            trimcolor = color1;
            $('#emboss').show();
            var prevselected = $('#trim-color').find('.color-2');
            prevselected.attr('id', '0.25');
            prevselected.attr('data-id', '0.25');
            var old_price = prevselected.closest('label').find('price');
            old_price.removeAttr('style');
            old_price.text('0.25');
            prevselected.closest('label').find('span.description').remove();
        }



        if (panel_layout == '3-n-1') {
            color3 = img.attr('src');
        }

        var photo1 = color1.split("/")[color1.split("/").length - 1];
        photo1 = photo1.split(".")[0];
        photo1 = theme.url + '/kippah_photo/' + fabric + '/' + photo1 + '.png';
        $('.panel-selected').find('img.panel1').attr('src', photo1);
        $('.panel-selected').show();

        var prevselected = $('#trim-color').find('.color-1');
        prevselected.attr('id', '0.25');
        prevselected.attr('data-id', '0.25');
        var old_price = prevselected.closest('label').find('price');
        old_price.removeAttr('style');
        old_price.text('0.25');
        prevselected.closest('label').find('span.description').remove();

        var colorid = $(this).data('divid');
        var input = $('#label_trim_' + colorid).find('input[type=radio]');

        input.attr('id', "0");
        input.attr('data-id', '0');
        input.addClass('color-1');
        var divid = input.data('divid');
        $('#label_trim_' + divid).find('.description').text('Same as Kippah').css('color', 'red');
        $('#label_trim_' + divid).find('price').text('$0.00').css('color', 'red');
        var parentTrim = $('#label_trim_' + divid).closest('.colorbox').parent('div');
        $('#label_trim_' + divid).closest('.colorbox').detach().prependTo(parentTrim);

        if (panel_layout != "Single Color") {

            var btn = $('<button/>');
            btn.text('Change');
            btn.addClass('open-btn');

            var openbtn = $('#color-1').find('button');
            if (openbtn.length == 0) {
                $('#color-1').prepend(btn);
            }


            $('#color-1').find('.extra-variation-catundertab').hide();
            $('#color-2').show().find('.extra-variation-catundertab').show('slow');
            $('.next-btn>a').removeClass('active');
        } else {
            var materialsName = window.location.pathname
            if (materialsName == '/shop/build-kippah/suede/') {
                var btn = $('<button/>');
                btn.text('Change');
                btn.addClass('open-btn');

                var openbtn = $('#color-1').find('button');
                if (openbtn.length == 0) {
                    $('#color-1').prepend(btn);
                }

                $('#color-1').find('.extra-variation-catundertab').hide();
                //$('#emboss').show().find('.extra-variation-catundertab').show('slow'); 

            }

            // $('#emboss').find('.extra-variation-catundertab').fadeIn();
            $('.next-btn>a').addClass('active');
        }

        texture = loader.load(color1);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;




        var metalness = 0.3;
        var reflects = 1;
        panel1 = group.getObjectByName('panel1');
        panel2 = group.getObjectByName('panel2');
        panel3 = group.getObjectByName('panel3');
        panel4 = group.getObjectByName('panel4');

        if (fabric == 'raw silk') {

            panel1.material.roughnessMap = texture;
            panel2.material.roughnessMap = texture;
            panel3.material.roughnessMap = texture;
            panel4.material.roughnessMap = texture;

            panel1.material.roughness = 0.5;
            panel2.material.roughness = 0.5;
            panel3.material.roughness = 0.5;
            panel4.material.roughness = 0.5;



            panel1.material.metalness = metalness;
            panel2.material.metalness = metalness;
            panel3.material.metalness = metalness;
            panel4.material.metalness = metalness;


            panel1.material.reflectivity = reflects;
            panel2.material.reflectivity = reflects;
            panel3.material.reflectivity = reflects;
            panel4.material.reflectivity = reflects;

            panel1.material.bumpScale = 2;
            panel2.material.bumpScale = 2;
            panel3.material.bumpScale = 2;
            panel4.material.bumpScale = 2;

        }

        if (fabric == 'deluxe satin') {

            reflects = 0.5;

            panel1.material.roughnessMap = texture;
            panel2.material.roughnessMap = texture;
            panel3.material.roughnessMap = texture;
            panel4.material.roughnessMap = texture;

            panel1.material.roughness = 0.5;
            panel2.material.roughness = 0.5;
            panel3.material.roughness = 0.5;
            panel4.material.roughness = 0.5;

            panel1.material.metalness = 0;
            panel2.material.metalness = 0;
            panel3.material.metalness = 0;
            panel4.material.metalness = 0;


            panel1.material.reflectivity = reflects;
            panel2.material.reflectivity = reflects;
            panel3.material.reflectivity = reflects;
            panel4.material.reflectivity = reflects;

            panel1.material.bumpScale = 2;
            panel2.material.bumpScale = 2;
            panel3.material.bumpScale = 2;
            panel4.material.bumpScale = 2;

        }

        panel2.material.map = texture;
        panel2.material.bumpMap = texture;

        panel4.material.map = texture;
        panel4.material.bumpMap = texture;

        if (panel_layout == 'Single Color') {

            panel1.material.map = texture;
            panel1.material.bumpMap = texture;

            panel3.material.map = texture;
            panel3.material.bumpMap = texture;

        } else if (panel_layout == '3-n-1') {

            panel3.material.map = texture;
            panel3.material.bumpMap = texture;
        }

        group.needsUpdate = true;

    });

    $(document).on('click', '.open-btn', function (e) {
        e.preventDefault();
        $(this).parent().find('.extra-variation-catundertab').show();
        $(this).remove();

    });

    $(document).on('change', '#color-2 input[type=radio]', function () {
        // alert("#color-2");
        var $this = $(this);
        var value = $(this).val();
        var name = $(this).data('name');
        var price = $(this).data('id');
        var cat = $(this).data('cat');
        var var_class = $(this).closest('.extra_variation_group').attr('id');
        var img = $(this).closest('.extra-variation-radio').find('img');
        $('#order-summary').find('.' + var_class).html('<strong>' + cat + ':</strong> ' + value);

        var prevselected = $('#trim-color').find('.color-2');
        prevselected.attr('id', '0.25');
        prevselected.attr('data-id', '0.25');
        var old_price = prevselected.closest('label').find('price');
        old_price.removeAttr('style');
        old_price.text('0.25');
        prevselected.closest('label').find('span.description').remove();

        color2 = img.attr('src');


        var colorid = $(this).data('divid');
        var input = $('#label_trim_' + colorid).find('input[type=radio]');

        input.attr('id', "0");
        input.attr('data-id', '0');
        input.addClass('color-2');
        var divid = input.data('divid');

        var btn = $('<button/>');
        btn.text('Change');
        btn.addClass('open-btn');

        var openbtn = $('#color-2').find('button');
        if (openbtn.length == 0 && $('#emboss').length > 0) {
            $('#color-2').prepend(btn);
            $('#color-2').find('.extra-variation-catundertab').fadeOut(function () {
                $('#emboss').fadeIn('slow');
            });
        }

        $('#label_trim_' + divid).find('.description').text('Same as Kippah').css('color', 'red');
        $('#label_trim_' + divid).find('price').text('$0.00').css('color', 'red');
        var parentTrim = $('#label_trim_' + divid).closest('.colorbox').parent('div');
        $('#label_trim_' + divid).closest('.colorbox').detach().prependTo(parentTrim);

        var photo2 = color2.split("/")[color2.split("/").length - 1];
        photo2 = photo2.split(".")[0];
        photo2 = theme.url + '/kippah_photo/' + fabric + '/' + photo2 + '.png';

        $('.panel-selected').find('img.panel2').attr('src', photo2);
        $('.next-btn>a').addClass('active');

        texture2 = loader.load(color2);

        panel1 = group.getObjectByName('panel1');

        panel3 = group.getObjectByName('panel3');


        panel1.material.map = texture2;
        panel1.material.bumpMap = texture2;

        if (panel_layout == 'Alternating Colors') {

            panel3.material.map = texture2;
            panel3.material.bumpMap = texture2;

            group.add(panel3);
        }

        group.needsUpdate = true;
    });

    var selected_emboss = "";
    $(document).on('change', '#emboss input[type=radio]', function () {
        // alert("#emboss");

        var value = $(this).val();
        var name = $(this).data('name');
        var price = $(this).data('id');
        var cat = $(this).data('cat');
        var var_class = $(this).closest('.extra_variation_group').attr('id');
        var img = $(this).closest('.extra-variation-radio').find('img');

        var btn = $('<button/>');
        btn.text('Change');
        btn.addClass('open-btn');
        $('#order-summary').find('span.logo-title1').html('<strong>Emboss:</strong> ' + value);
        //window.localStorage.setItem("customprice1",value);
        //  console.log(value);
        var openbtn = $('#emboss').find('button');
        if (openbtn.length == 0 && $('#emboss').length > 0) {
            $('#emboss').prepend(btn);
            $('#emboss').find('.extra-variation-catundertab').fadeOut(function () {
                $('#pattern-color').fadeIn('slow');
            });
        }
        patterncolor = "";
        emboss_pattern = img.attr('src');
        selected_emboss = emboss_pattern.split("/")[emboss_pattern.split("/").length - 1];
        $('.next-btn>a').addClass('active');

        pattern = loader.load(emboss_pattern);

        panel1 = group.getObjectByName('panel1');
        panel2 = group.getObjectByName('panel2');
        panel3 = group.getObjectByName('panel3');
        panel4 = group.getObjectByName('panel4');

        panel1.material.bumpMap = pattern;
        panel1.material.bumpScale = 8;
        panel1.receiveShadow = true;
        panel1.material.roughness = 1;
        panel1.needsUpdate = true;

        panel2.material.bumpMap = pattern;
        panel2.material.bumpScale = 8;
        panel2.receiveShadow = true;
        panel2.material.roughness = 1;
        panel2.needsUpdate = true;

        panel3.material.bumpMap = pattern;
        panel3.material.bumpScale = 8;
        panel3.receiveShadow = true;
        panel3.material.roughness = 1;
        panel3.needsUpdate = true;

        panel4.material.bumpMap = pattern;
        panel4.material.bumpScale = 8;
        panel4.receiveShadow = true;
        panel4.material.roughness = 1;
        panel4.needsUpdate = true;

        emboss_mesh1 = group.getObjectByName('emboss_mesh1');
        emboss_mesh1.visible = false;
        emboss_mesh2 = group.getObjectByName('emboss_mesh2');
        emboss_mesh2.visible = false;
        emboss_mesh3 = group.getObjectByName('emboss_mesh3');
        emboss_mesh3.visible = false;
        emboss_mesh4 = group.getObjectByName('emboss_mesh4');
        emboss_mesh4.visible = false;

        group.needsUpdate = true;

        if (jQuery('#pattern-color input[type=radio]:checked').length) {
            jQuery('#pattern-color input[type=radio]:checked').trigger('change')
        }
    });



    $(document).on('change', '#pattern-color input[type=radio]', function () {
        // alert("#pattern-color");
        var value = $(this).val();
        var name = $(this).data('name');
        var price = $(this).data('id');
        var cat = $(this).data('cat');
        var var_class = $(this).closest('.extra_variation_group').attr('id');
        var img = $(this).closest('.extra-variation-radio').find('img');
        $('#order-summary').find('.' + var_class).html('<strong>' + cat + ':</strong> ' + name);
        var color = $(this).data('value');
        patterncolor = theme.url + '/emboss_color/' + color + '/' + selected_emboss;

        emboss_color = loader.load(patterncolor);

        $('.next-btn>a').addClass('active');

        emboss_mesh1 = group.getObjectByName('emboss_mesh1');
        emboss_mesh2 = group.getObjectByName('emboss_mesh2');
        emboss_mesh3 = group.getObjectByName('emboss_mesh3');
        emboss_mesh4 = group.getObjectByName('emboss_mesh4');

        emboss_mesh1.visible = true;
        emboss_mesh1.material.map = emboss_color;
        emboss_mesh1.material.bumpMap = pattern;
        emboss_mesh1.material.roughnessMap = pattern;
        emboss_mesh1.material.roughness = 1;
        emboss_mesh1.material.bumpScale = 2;
        emboss_mesh1.material.shininess = 100;
        emboss_mesh1.material.reflectivity = 1;
        emboss_mesh1.material.transparent = true;
        emboss_mesh1.material.opacity = 1;
        emboss_mesh1.material.metalness = 0.5;

        emboss_mesh2.visible = true;
        emboss_mesh2.material = emboss_mesh1.material.clone();
        emboss_mesh3.visible = true;
        emboss_mesh3.material = emboss_mesh1.material.clone();
        emboss_mesh4.visible = true;
        emboss_mesh4.material = emboss_mesh1.material.clone();

        group.needsUpdate = true;

    });
    $(document).on('change', '#clip', function () {
      $('.next-btn>a').addClass('active');	
    });
    $(document).on('change', '#trim-color input[type=radio]', function () {
        // alert("trim-color");
 
        $('#trim-color input[type=radio]:checked').removeAttr('checked');
        $(this).prop('checked', true)

        var value = $(this).val();
        var name = $(this).data('name');
        var price = $(this).data('id');
        var cat = $(this).data('cat');

        var var_class = $(this).closest('.extra_variation_group').attr('id');

        var img = $(this).closest('.extra-variation-radio').find('img');
        // $('#order-summary').find('.'+var_class).html('<strong>Trim Color:</strong> '+value+ ' - '+price);
        $('#order-summary').find('.' + var_class).html('<strong>Trim Color:</strong> ' + value);
        trimcolor = img.attr('src');
        $('.next-btn>a').addClass('active');
        $('#suede-trim input[type=radio]:checked').removeAttr('checked');
        $('.trim-color').show();
        $('.suede-trim').hide();
        $('#top-trim input[type=radio]:checked').removeAttr('checked');
        is_suede_trim = false;



        var opentrimbtn = $('#trim-color').find('button');
        if (!opentrimbtn.length) {
            $('#trim-color').prepend(btn);
            $('#suede-trim').prepend(btn);
        }

        var suede_trim = $('#trim-color.extra_variation_group').length;

        if (!suede_trim) {
            $('#trim-color.extra_variation_group').find('.extra-variation-catundertab').hide('slow');
            $('#suede-trim.extra_variation_group').find('.extra-variation-catundertab').hide('slow');
        } else {
            var materialsName = window.location.pathname
            if (materialsName == '/shop/build-kippah/suede/') {
                var btn = $('<button/>');
                btn.text('Change');
                btn.addClass('open-btn trim-open-btn');

                var openbtn = $('#trim-color').find('button');
                if (openbtn.length == 0) {
                    $('#trim-color').prepend(btn);
                }

                $('#trim-color').find('.extra-variation-catundertab').hide();
                $('#suede-trim.extra_variation_group').show().find('.extra-variation-catundertab').show('slow');

            }

            // var openbtnSuede = $('#suede-trim').find('button'); 
            // var btn1 = $('<button/>');
            // btn1.text('Change');
            // btn1.addClass('open-btn suede-trim-open-btn');
            // if(openbtnSuede.length==0){
            //     $('#suede-trim').prepend(btn1);   
            // }  

            //var btn = $('<button/>').text('Change').addClass('open-btn trim-open-btn');
        }


        group.remove(trim);

        trimtexture = loader.load(trimcolor);
        trimtexture.wrapS = trimtexture.wrapT = THREE.RepeatWrapping;
        trimtexture.repeat.set(1, 1);

        if (with_toptrim) {

            $('#top-trim').show();
            var topcylinder = addTopTrim(trimcolor, is_suede_trim);
            group.add(topcylinder);
        }

        var new_trim = trim.clone(false);
        group.remove(trim);

        new_trim.material.map = trimtexture;
        new_trim.material.bumpMap = trimtexture;


        trim = new_trim;
        group.add(trim);
        //group.add(thread);
        group.needsUpdate = true;


    });

    $(document).on('change', '#suede-trim input[type=radio]', function () {
        // alert("#suede-trim");

        var value = $(this).val();
        var name = $(this).data('name');
        var price = $(this).data('id');
        var cat = $(this).data('cat');
        var var_class = $(this).closest('.extra_variation_group').attr('id');

        var img = $(this).closest('.extra-variation-radio').find('img');
        //$('#order-summary').find('.trim-color>span').html('<strong>Trim Color:</strong> '+value+ ' - '+price);
        $('#order-summary').find('.' + var_class).html('<strong>Suede Trim:</strong>' + value.substr(10));
        trimcolor = img.attr('src');

        $('.next-btn>a').addClass('active');

        $('#trim-color input[type=radio]:checked').removeAttr('checked');
        $('.trim-color').hide();
        $('.suede-trim').show();
        $('#top-trim input[type=radio]:checked').removeAttr('checked');

        is_suede_trim = true;
        var openbtnSuede = $('#suede-trim').find('button');
        var btn1 = $('<button/>');
        btn1.text('Change');
        btn1.addClass('open-btn suede-trim-open-btn');
        if (openbtnSuede.length == 0) {
            $('#suede-trim').prepend(btn1);
        }

        //var btn = $('<button/>').text('Change').addClass('open-btn sude-trim-open-btn');

        var opentrimbtn = $('#trim-color').find('button');
        if (opentrimbtn.length == 0) {
            $('#trim-color').prepend(btn);
            $('#suede-trim').prepend(btn);
        }

        $('#trim-color.extra_variation_group').find('.extra-variation-catundertab').hide('slow');
        $('#suede-trim.extra_variation_group').find('.extra-variation-catundertab').hide('slow');

        if (with_toptrim) {

            $('#top-trim').show();
        }
        group.remove(trim);
        //group.remove(thread);

        trimtexture = loader.load(trimcolor);
        trimtexture.wrapS = trimtexture.wrapT = THREE.RepeatWrapping;

        trimtexture.offset.set(0, 0);
        trimtexture.repeat.set(6.8, 5);
        trimtexture.center.set(0.89, 0.66);
        trimtexture.rotation = Math.PI * 2;

        if (fabric == 'raw silk' || fabric == 'deluxe satin') {

            trim.material.roughnessMap = trimtexture;
        }

        var new_trim = trim.clone(false);
        group.remove(trim);



        new_trim.material.map = trimtexture;
        new_trim.material.bumpMap = trimtexture;


        trim = new_trim;

        group.add(trim);
        //group.add(thread);
        group.needsUpdate = true;

    });

    $(document).on('change', '#top-trim input[type=radio]', function () {
        // alert("#top-trim");
        var value = $(this).val();
        var name = $(this).data('name');
        var price = $(this).data('id');
        var cat = $(this).data('cat');
        var var_class = $(this).closest('.extra_variation_group').attr('id');
        if (value == 'Yes') {

            if (!trimcolor) {
                $.alert({ title: '', content: 'Trim color or Suede Trim not selected!', boxWidth: '300px', useBootstrap: false, type: 'dark' });
                return false;

            }
            $('#order-summary').find('.' + var_class).html('Include Top Trim');

            var topcylinder = addTopTrim(trimcolor, is_suede_trim);
            group.add(topcylinder);

        } else {
            $('#order-summary').find('.' + var_class).html('Include Top Trim');
            var topcylinder = addTopTrim(color1, false);
            group.add(topcylinder);
        }

    });


    var selected_sizes = 0;
       
       $(document).on('change','.size-change input[type=checkbox]',function(){ 
       $('.next-btn.centurygothic.active').addClass('size-alert')
           var value = $(this).val();
           var name = $(this).data('name');              
           var cat = $(this).data('cat');
          var child = $('input[data-parentname='+name);
          var min_qty = $("input[name='attribute_kippah-material']:checked").data(); 
          //$("input[name='attribute_kippah-material']").data('min_qty',0);
         var total_qty = 0;
        var checked_sizes = $('#size').find('input[type=number]:enabled');
               checked_sizes.each(function(i,sz){  
                  total_qty = total_qty + parseInt($(sz).val());
               });
         var mqty = $('#size').find('[data-parentname='+value+']').val();  
        // alert(mqty);
         if(this.checked){  
               selected_sizes++; 
               if(selected_sizes>2){
                 selected_sizes--;
                 //$('.small-qty')[0].checked = true;
                 $(this).prop('checked', false);
                 $.alert({title:'',content:'Only 2 different sizes are allowed!',boxWidth:'300px',useBootstrap:false,type:'dark'});
                 return false;
               }
            
               $('.size-title').show();

               var html = value+': <span class="'+value+'-qty">'+min_qty+'</span>';
               $('#order-summary').find('.'+value).html(html);
                child.closest('.extra-variation-catunderbox').find('div.extra-variation-notallowed').removeClass('extra-variation-notallowed');
                child.prop('disabled',false);
                child.val(min_qty).change();
                
             
              total_qty = total_qty + parseInt(mqty);
                
              if(selected_sizes>0){
                $('.next-btn>a').removeClass('active');
            

                //$(this).removeClass('active');
              }  
               
           }else{  

              $(this).attr('disabled');
 // $('.next-btn>a').attr('disabled','disabled');
            //   alert("hi");
                                            
 
              var min_qty=60;
               total_qtyi = total_qty - parseInt(mqty);
               
             //  alert(total_qtyi);
           
               if(min_qty >total_qtyi){
               
                  //$.alert({title:'',content:'Minimum quantity is '+ min_qty,boxWidth:'300px',useBootstrap:false,type:'dark'});
                 $('.next-btn>a').removeClass('active');
                //  $.alert({title:'',content:'Minimum quantity is '+ min_qty,boxWidth:'300px',useBootstrap:false,type:'dark'});
               }

               else if (min_qty < total_qtyi)
               {
                              
                  //$.alert({title:'',content:'Minimum quantity is '+ min_qty,boxWidth:'300px',useBootstrap:false,type:'dark'});
                                 $('.next-btn>a').removeClass('active');

               }
               else
               {
               // alert(total_qty);
                              //  alert("minqty =than ");

                                        
                                                                $('.next-btn>a').addClass('active');

               }
              
               $('#order-summary').find('.'+value).html('');
               child.prop('disabled',true);
               child.closest('.extra-variation-catunderbox').find('div').addClass('extra-variation-notallowed');
               selected_sizes--;
           }
           
            //$('input[name=quantity]').val(total_qtyi);
        });
        
         
     
			$(document).on('click', '.next-btn.centurygothic.active.size-alert', function () {
			
            var value = $('.size-change input[type=number]').val();
            var name = $('.size-change input[type=number]').data('name');
            var price = $('.size-change input[type=number]').data('id');
            var parent = $('.size-change input[type=number]').data('parentname');
            var cat = $('.size-change input[type=number]').data('cat');      
            var min_qty = $("input[name='attribute_kippah-material']:checked").data('min_qty'); 

            //alert(name+"="+price+"="+parent+"="+cat+"="+min_qty);
            if($('.size-change input[type=number]').is(':enabled')==false){
                return false;
                }
            var  total_qty = 0;
            var checked_sizes = $('#size input[type=number]:enabled');
            checked_sizes.each(function(i,sz){  
                const inputVal = parseInt($(sz).val());
                if (!isNaN(inputVal)) {
                total_qty = total_qty + parseInt($(sz).val());
                }
            });
            // cvalue = min_qty - cvalue
                $('input[name=quantity]').val(parseInt(value));
            
            if((total_qty < min_qty)) {
            $.alert({title:'',content:'Minimum quantity is '+ min_qty,boxWidth:'300px',useBootstrap:false,type:'dark'}); }
            else if(total_qty > min_qty){
				$.alert({title:'',content:'Minimum quantity is '+ min_qty,boxWidth:'300px',useBootstrap:false,type:'dark'});
			}else if(total_qty == min_qty){
				$('.next-btn>a').addClass('active');
			}else {
                $('.next-btn>a').removeClass('active');
            }
                    
            $('#order-summary').find('.'+parent+'-qty').text(value);	
            //    $('.next-btn>a').addClass('active');
            //if (total_qty == min_qty) {
               // $('.next-btn>a').addClass('active');
            //} else {
                //$('.next-btn>a').removeClass('active');
            //}
            return false;
            
            });

    /*add code for sizing start*/
    var selected_sizeing = 0;

    $(document).on('change', '#sizeing input[type=checkbox]', function () {
        // alert("#sizeing");
        var value = $(this).val();

        var name = $(this).data('name');
        var cat = $(this).data('cat');
        var child = $('input[data-parentname=' + name);
        var min_qty = $("input[name='attribute_kippah-material']:checked").data();
        var total_qty = 0;
        var checked_sizes = $('#sizeing').find('input[type=number]:enabled');
        checked_sizes.each(function (i, sz) {
            total_qty = total_qty + parseInt($(sz).val());
        });
        var mqty = $('#sizeing').find('[data-parentname=' + value + ']').val();

        if (this.checked) {
            //alert(value+"="+name+"="+cat+"="+child+"="+min_qty+"="+total_qty+"="+checked_sizes+"="+mqty);
            selected_sizeing++;
            if (selected_sizeing > 2) {
                selected_sizeing--;
                $(this).attr('checked', false);
                $.alert({ title: '', content: 'Min. Order Quantity 60 Kippahs You may select upto 2 sizes ', boxWidth: '300px', useBootstrap: false, type: 'dark' });
                return false;
            }
            $('.size-title').show();
            var html = value + ': <span class="' + value + '-qty">' + min_qty + '</span>';
            $('#order-summary').find('.' + value).html(html);
            child.closest('.extra-variation-catunderbox').find('div.extra-variation-notallowed').removeClass('extra-variation-notallowed');
            child.prop('disabled', false);
            child.val(min_qty).change();


            total_qty = total_qty + parseInt(mqty);

            if (selected_sizeing > 0) {
                $('.next-btn>a').removeClass('active');
            }

        } else {
            //alert("test2");             
            $(this).attr('disabled');
            total_qty = total_qty - parseInt(mqty);
            if (min_qty > total_qty) {
                $('.next-btn>a').removeClass('active');
                $.alert({ title: '', content: 'Minimum quantity is ' + min_qty, boxWidth: '300px', useBootstrap: false, type: 'dark' });
            }

            $('#order-summary').find('.' + value).html('');
            child.prop('disabled', true);
            child.closest('.extra-variation-catunderbox').find('div').addClass('extra-variation-notallowed');
            selected_sizeing--;
        }

        $('input[name=quantity]').val(total_qty);
    });


    $(document).on('change', '#sizeing input[type=number]', function () {
        // alert("#sizeing");

        var cvalue = $(this).val();
        // alert(value);
        var name = $(this).data('name');
        var price = $(this).data('id');
        var parent = $(this).data('parentname');
        var cat = $(this).data('cat');
        var min_qty = $("input[name='attribute_kippah-material']:checked").data('min_qty');


        //alert(name+"="+price+"="+parent+"="+cat+"="+min_qty);

        if ($(this).is(':enabled') == false) {
            return false;
        }
        var total_qty = 0;
        var checked_sizes = $('#sizeing input[type=number]:enabled');
        checked_sizes.each(function (i, sz) {
            const inputVal = parseInt($(sz).val());
            if (!isNaN(inputVal)) {
                total_qty = total_qty + parseInt($(sz).val());
            }
            console.log('in', parseInt($(sz).val()));
        });
        console.log('min_qty', min_qty);
        console.log('total_qty', total_qty);
        cvalue = min_qty - cvalue
        $('input[name=quantity]').val(parseInt(cvalue));

        // $('input[name=quantity]').val(total_qty);

        if (total_qty!="" &&(total_qty < min_qty)) {
            // $(this).val(parseInt(min_qty));
            $.alert({ title: '', content: 'Minimum quantity is ' + min_qty, boxWidth: '300px', useBootstrap: false, type: 'dark' });
            // return false;
        }
        else if (total_qty!="" &&(total_qty > min_qty)) {
            $.alert({ title: '', content: 'Minimum quantity is ' + min_qty, boxWidth: '300px', useBootstrap: false, type: 'dark' });
            // return false;
        }

        $('#order-summary').find('.' + parent + '-qty').text(cvalue);
        // $('.next-btn>a').addClass('active');
        if (total_qty == min_qty) {
            $('.next-btn>a').addClass('active');
        } else {
            $('.next-btn>a').removeClass('active');
        }
        return false;

    });
    /*add code for sizing end*/
    /* start code sizing1*/
    var selected_sizeing1 = 0;

    $(document).on('change', '#sizeing1 input[type=checkbox]', function () {
        // alert("#sizeing1");
        var value = $(this).val();

        var name = $(this).data('name');
        var cat = $(this).data('cat');
        var child = $('input[data-parentname=' + name);
        var min_qty = $("input[name='attribute_kippah-material']:checked").data();
        var total_qty = 0;
        var checked_sizes = $('#sizeing1').find('input[type=number]:enabled');
        checked_sizes.each(function (i, sz) {
            total_qty = total_qty + parseInt($(sz).val());
        });

        var mqty = $('#sizeing1').find('[data-parentname=' + value + ']').val();
        var selected_panel = $('#panel-layout input[type=radio]:checked');
        if (this.checked) {
            //alert(value+"="+name+"="+cat+"="+child+"="+min_qty+"="+total_qty+"="+checked_sizes+"="+mqty);
            selected_sizeing1++;
            if (selected_sizeing1 > 1) {
                selected_sizeing1--;
                $(this).attr('checked', false);
                $(this).prop('checked', false);
                $.alert({ title: '', content: 'Only 1 different sizes are allowed!', boxWidth: '300px', useBootstrap: false, type: 'dark' });
                return false;
            }
            if (selected_sizeing1 > 2) {
                selected_sizeing1--;
                $(this).attr('checked', false);
                $.alert({ title: '', content: 'Only 2 different sizes are allowed!', boxWidth: '300px', useBootstrap: false, type: 'dark' });
                return false;
            }
            /* else if(selected_sizeing1>1 ){
              console.log(this);
             $(this).attr('checked',false);
               $.alert({title:'',content:'Only 1 different sizes are allowed!',boxWidth:'300px',useBootstrap:false,type:'dark'});
               return false;
             }*/


            $('.size-title').show();
            var html = value + ': <span class="' + value + '-qty">' + min_qty + '</span>';
            $('#order-summary').find('.' + value).html(html);
            child.closest('.extra-variation-catunderbox').find('div.extra-variation-notallowed').removeClass('extra-variation-notallowed');
            child.prop('disabled', false);
            child.val(min_qty).change();


            total_qty = total_qty + parseInt(mqty);

            if (selected_sizeing1 > 0) {
                $('.next-btn>a').removeClass('active');
            }


        } else {
            //alert("test2");             
            $(this).attr('disabled');
             var min_qty=50;
            total_qtyi = total_qty - parseInt(mqty);
            if (min_qty > total_qtyi) {
                $('.next-btn>a').removeClass('active');
                $.alert({ title: '', content: 'Minimum quantity is ' + min_qty, boxWidth: '300px', useBootstrap: false, type: 'dark' });
            }
            
               else if (min_qty < total_qtyi)
               {
                               // alert("minqty <than ");

                                //     alert(total_qty);
                                 $('.next-btn>a').removeClass('active');

               }
               else
               {
               // alert(total_qty);
                              //  alert("minqty =than ");

                                        
                                                                $('.next-btn>a').addClass('active');

               }
            $('#order-summary').find('.' + value).html('');
            child.prop('disabled', true);
            child.closest('.extra-variation-catunderbox').find('div').addClass('extra-variation-notallowed');
            selected_sizeing1--;
        }

        $('input[name=quantity]').val(total_qty);
    });


    $(document).on('change', '#sizeing1 input[type=number]', function () {
       // alert("#sizeing1");

        var value = $(this).val();
        // alert(value);
        var name = $(this).data('name');
        var price = $(this).data('id');
        var parent = $(this).data('parentname');
        var cat = $(this).data('cat');
        var min_qty = $("input[name='attribute_kippah-material']:checked").data('min_qty');


        //alert(name+"="+price+"="+parent+"="+cat+"="+min_qty);

        if ($(this).is(':enabled') == false) {
            return false;
        }
        var total_qty = 0;
        var checked_sizes = $('#sizeing1 input[type=number]:enabled');
        checked_sizes.each(function (i, sz) {
            const inputVal = parseInt($(sz).val());
            if (!isNaN(inputVal)) {
                total_qty = total_qty + parseInt($(sz).val());
            }
            console.log('in', parseInt($(sz).val()));
        });
        console.log('min_qty', min_qty);
        console.log('total_qty', total_qty);
       // value = min_qty - cvalue

        $('input[name=quantity]').val(parseInt(value));
        // $('input[name=quantity]').val(total_qty);

        if (total_qty < min_qty) {
            // $(this).val(parseInt(min_qty));
            // $.alert({ title: '', content: 'Minimum quantity is ' + min_qty, boxWidth: '300px', useBootstrap: false, type: 'dark' });
            // return false;
        }

        else if (total_qty > min_qty) {
            $.alert({ title: '', content: 'Minimum quantity is ' + min_qty, boxWidth: '300px', useBootstrap: false, type: 'dark' });
            // return false;
        }

        $('#order-summary').find('.' + parent + '-qty').text(value);
        // $('.next-btn>a').addClass('active');
        if (total_qty == min_qty) {
            $('.next-btn>a').addClass('active');
        } else {
            $('.next-btn>a').removeClass('active');
        }
        return false;
        

    });
    // end code sizing1
    /*start code sizeing2*/
    //$('.extra-variation-buyerinputnumber').removeAttr('value');
    var selected_sizeing2 = 0;

    $(document).on('change', '#sizeing2 input[type=checkbox]', function () {
        //alert("#sizeing2");

        var value = $(this).val();

        var name = $(this).data('name');
        var cat = $(this).data('cat');
        var child = $('input[data-parentname=' + name);
        var min_qty = $("input[name='attribute_kippah-material']:checked").data();
        var total_qty = 0;
        var checked_sizeing2 = $('#sizeing2').find('input[type=number]:enabled');
        checked_sizeing2.each(function (i, sz) {
            total_qty = total_qty + parseInt($(sz).val());
        });
        var mqty = $('#sizeing2').find('[data-parentname=' + value + ']').val();

        if (this.checked) {
            //alert(value+"="+name+"="+cat+"="+child+"="+min_qty+"="+total_qty+"="+checked_sizes+"="+mqty);

            selected_sizeing2++;
            if (selected_sizeing2 > 2) {
                selected_sizeing2--;
                $(this).prop('checked', false);
                $.alert({ title: '', content: 'Only 2 different sizes are allowed!', boxWidth: '300px', useBootstrap: false, type: 'dark' });
                return false;
            }
            $('.size-title').show();
            var html = value + ': <span class="' + value + '-qty">' + min_qty + '</span>';
            $('#order-summary').find('.' + value).html(html);
            child.closest('.extra-variation-catunderbox').find('div.extra-variation-notallowed').removeClass('extra-variation-notallowed');
            child.prop('disabled', false);
            child.val(min_qty).change();


            total_qty = total_qty + parseInt(mqty);

            if (selected_sizeing2 > 0) {
                $('.next-btn>a').removeClass('active');
            }

        } else {
            //alert("test2");             
            $(this).attr('disabled');
                          var min_qty=60;

            total_qtyi = total_qty - parseInt(mqty);
            if (min_qty > total_qtyi) {
                $('.next-btn>a').removeClass('active');
                $.alert({ title: '', content: 'Minimum quantity is ' + min_qty, boxWidth: '300px', useBootstrap: false, type: 'dark' });
            }
               else if (min_qty < total_qtyi)
               {
                               // alert("minqty <than ");

                                //     alert(total_qty);
                                 $('.next-btn>a').removeClass('active');

               }
               else
               {
               // alert(total_qty);
                              //  alert("minqty =than ");

                                        
                                                                $('.next-btn>a').addClass('active');

               }

            $('#order-summary').find('.' + value).html('');
            child.prop('disabled', true);
            child.closest('.extra-variation-catunderbox').find('div').addClass('extra-variation-notallowed');
            selected_sizeing2--;
        }

        $('input[name=quantity]').val(total_qtyi);
    });


    $(document).on('change', '#sizeing2 input[type=number]', function () {
        // alert("#sizeing2");

        var value = $(this).val();
        //alert('current val'+ cvalue);
        var name = $(this).data('name');
        var price = $(this).data('id');
        var parent = $(this).data('parentname');
        var cat = $(this).data('cat');
        var min_qty = $("input[name='attribute_kippah-material']:checked").data('min_qty');


        //alert(name+"="+price+"="+parent+"="+cat+"="+min_qty);

        if ($(this).is(':enabled') == false) {
            return false;
        }
        var total_qty = 0;
        var checked_sizes = $('#sizeing2  input[type=number]:enabled');
        checked_sizes.each(function (i, sz) {
            const inputVal = parseInt($(sz).val());
            if (!isNaN(inputVal)) {
                total_qty = total_qty + parseInt($(sz).val());
            }
            console.log('in', parseInt($(sz).val()));
        });
        console.log('min_qty', min_qty);
        console.log('total_qty', total_qty);
       // cvalue = min_qty - cvalue
        $('input[name=quantity]').val(parseInt(value));
        if (total_qty!="" &&(total_qty < min_qty)) {
            // $().val(parseInt(cvalue));
            $.alert({ title: '', content: 'Minimum quantity is ' + min_qty, boxWidth: '300px', useBootstrap: false, type: 'dark' });
            // return false;
        }
        else if (total_qty!="" &&(total_qty > min_qty)) {
            $.alert({ title: '', content: 'Minimum quantity is ' + min_qty, boxWidth: '300px', useBootstrap: false, type: 'dark' });
            // return false;
        }
        $('#order-summary').find('.' + parent + '-qty').text(value);
        if (total_qty == min_qty) {
            $('.next-btn>a').addClass('active');
        } else {
            $('.next-btn>a').removeClass('active');
        }
        return false;
    });
    /*code end of sizeing2*/

    $(document).on('change', '#lineing input[type=radio]', function () {
        // alert("#lineing");

        //    group.remove(group.getObjectByName('lineing')); 
        //    group.needsUpdate = true;

        var value = $(this).val();
        var name = $(this).data('name');
        var price = $(this).data('id');
        var cat = $(this).data('cat');
        var var_class = $(this).closest('.extra_variation_group').attr('id');
        var img = $(this).closest('.extra-variation-radio').find('img');
        $('#order-summary').find('.' + var_class).html('<strong>Inner lineing:</strong> ' + value);
        lining_color = img.attr('src');
        $('.next-btn>a').addClass('active');


        //     undercloth_fabric = loader.load(lineing_color);

        //     var material5 = new THREE.MeshPhongMaterial({ 
        //         map:undercloth_fabric, 
        //         side: THREE.DoubleSide,
        //         transparent: true, 
        //         opacity: 1, 
        //         depthWrite:true,
        //         depthTest:true
        //         });
        //     var geometry5 = new THREE.SphereBufferGeometry( 56.2, 32, 32, 0, 6.3, 0, 1.1 );
        //     lineing = new THREE.Mesh( geometry5, material5 );
        //     lineing.position.z = 0;
        //     lineing.position.x = 0;
        //     lineing.position.y = -12.5;       
        //     lineing.scale.set(1,0.7,1);
        //     lineing.name = 'lineing';


        //    group.add(lineing);      
        //    group.needsUpdate = true;      
        //    camera.position.set( -10, -200, 1 );
        //    controls.update();         
    });
    // /* add custom option */



    $(document).on('change', '#Lining input[type=radio]', function () {
        // alert("#Lining");

        group.remove(group.getObjectByName('Lining'));
        group.needsUpdate = true;

        var value = $(this).val();
        var name = $(this).data('name');
        var price = $(this).data('id');
        var cat = $(this).data('cat');
        var var_class = $(this).closest('.extra_variation_group').attr('id');
        var img = $(this).closest('.extra-variation-radio').find('img');
        $('#order-summary').find('.' + var_class).html('<strong>Inner Lining:</strong> ' + value);
        Lining_color = img.attr('src');
        $('.next-btn>a').addClass('active');

        undercloth_fabric = loader.load(Lining_color);

        var material5 = new THREE.MeshPhongMaterial({
            map: undercloth_fabric,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
            depthWrite: true,
            depthTest: true
        });
        var geometry5 = new THREE.SphereBufferGeometry(56.2, 32, 32, 0, 6.3, 0, 1.1);
        Lining = new THREE.Mesh(geometry5, material5);
        Lining.position.z = 0;
        Lining.position.x = 0;
        Lining.position.y = -12.5;
        Lining.scale.set(1, 0.7, 1);
        Lining.name = 'Lining';


        group.add(Lining);
        group.needsUpdate = true;
        camera.position.set(-10, -200, 1);
        controls.update();
    });
    /* add custom option end */

    /* add custom option lining with lower "l" */
    $(document).on('change', '#lining input[type=radio]', function () {
        // alert("lining");

        group.remove(group.getObjectByName('Lining'));
        group.needsUpdate = true;

        var value = $(this).val();
        var name = $(this).data('name');
        var price = $(this).data('id');
        var cat = $(this).data('cat');
        var var_class = $(this).closest('.extra_variation_group').attr('id');
        var img = $(this).closest('.extra-variation-radio').find('img');
        $('#order-summary').find('.' + var_class).html('<strong>Inner Lining:</strong> ' + value);
        Lining_color = img.attr('src');
        $('.next-btn>a').addClass('active');

        undercloth_fabric = loader.load(Lining_color);

        var material5 = new THREE.MeshPhongMaterial({
            map: undercloth_fabric,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
            depthWrite: true,
            depthTest: true
        });
        var geometry5 = new THREE.SphereBufferGeometry(56.2, 32, 32, 0, 6.3, 0, 1.1);
        Lining = new THREE.Mesh(geometry5, material5);
        Lining.position.z = 0;
        Lining.position.x = 0;
        Lining.position.y = -12.5;
        Lining.scale.set(1, 0.7, 1);
        Lining.name = 'Lining';


        group.add(Lining);
        group.needsUpdate = true;
        camera.position.set(-10, -200, 1);
        controls.update();
    });
    /* add custom option lining with lower "l" end */

    $(document).on('change', '#embroidered-logo input[type=radio]', function () {
        // alert("embroidered-logo");
        $('.next-btn>a').addClass('active');
        var value = $(this).val();
        var name = $(this).data('name');
        var price = $(this).data('id');
        var cat = $(this).data('cat');
        var var_class = $(this).closest('.extra_variation_group').attr('id');
        //console.log(value,name,price,cat,var_class);
        $('#order-summary').find('span.logo-title').html('<strong>Embroidered Logo:</strong> ' + name);
        $('#csprice').text(value);
        window.localStorage.setItem("customprice", value);
        // console.log(value);
        var dataval = $(this).data('value');
        // alert(dataval);

        if (dataval == 'Upload later' && embroidered_logo_global != '') {
            group.remove(group.getObjectByName('Logo'));
            group.needsUpdate = true;
            controls.update();
        }

        //console.log(dataval);
        if (dataval == "Upload") {
            // alert("1");
            $('.next-btn>a').addClass('active');

            $('.file-catunderbox').fadeIn('slow');
            $('.special-instructions-catunderbox').show();
            //  $('.special-instructions-catunderbox').fadeIn();
            $('file.extra-variation-buyerinputfile').removeAttr('disabled');
        } else if (dataval == "Design for Me") {
            // alert("2");
            $('.next-btn>a').addClass('active');

            $('.file-catunderbox').hide();
            $('.special-instructions-catunderbox').fadeIn('slow');
            $('file.extra-variation-buyerinputfile').attr('disabled');
        }
        else {
            // alert("3");
            $('.next-btn>a').addClass('active');

            $('.file-catunderbox').hide();
            $('.special-instructions-catunderbox').show();
            $('file.extra-variation-buyerinputfile').attr('disabled');
        }
        $('textarea.instruction').removeAttr('disabled');
    });


    $('textarea.text-content').on('keyup', function () {

        var content = $(this).val();
        var cnt_chars = content.length;

        if (cnt_chars >= 100) {
            $.alert({ title: '', content: 'Up to 100 characters only is allowed!', boxWidth: '300px', useBootstrap: false, type: 'dark' });
            return false;
        }

        var typeface = $('select[name=Typeface]').val();
        var txtColor = $('select.text-color').val();

        content = nl2br(content, '<br/>');
        $("#sample-text").html(content);

        $('#order-summary').find('.personalized-text').html('<strong>Personalized Text:</strong><br> Type Face: ' + typeface + '<br> Color: ' + txtColor + '<br> Text: ' + content);


    })

    $('textarea.special-instructions').on('keyup', function () {

        var content = $(this).val();
        $('#order-summary').find('.embroidered-logo li').html('Special Instruction: ' + content);


    })

    $(document).on('click', '#keyboardInputLayout table', function () {
        var content = $('textarea.text-content').val();
        content = nl2br(content, '<br/>');
        $("#sample-text").html(content);
        var typeface = $('select[name=Typeface]').val();
        var txtColor = $('input.text-color').val();
        $("#sample-text").css({ 'color': txtColor, 'font-family': typeface });
        $('#order-summary').find('.personalized-text').html('<strong>Personalized Text:</strong><br> Type Face: ' + typeface + '<br> Color: ' + txtColor + '<br> Text: ' + content);
    });

    function nl2br(str, is_xhtml) {
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    }


    var embroidered_logo_global = '';
    $(document).on('click', '.sample-logo', function (e) {
        e.preventDefault();

        // $('.embroidered-logo').find('li').html('Logo: ' + logo_html).removeAttr('checked');
        // var logo_html = '<img id="uploaded-logo" src=' + embroidered_logo + '>'.removeAttr('checked');
        // $(this).prop('checked', true)
        // embroidered_logo = $(this).data('logo').removeAttr('checked');

        embroidered_logo = $(this).data('logo');
        if (embroidered_logo != '') {
            embroidered_logo_global = embroidered_logo;
        }

        var logo_html = '<img id="uploaded-logo" src=' + embroidered_logo + '>';
        // alert(logo_html);
        $('.embroidered-logo').find('li').html('Logo: ' + logo_html);
        var extra_variation_data = $('#extra_variation_data').val();
        if (extra_variation_data.indexOf('Logo') > -1) {
            logo_html = 'Logo:<img id="uploaded-logo" src="' + embroidered_logo + '"/>';
        }
        $('#extra_variation_data').val(extra_variation_data + '<li>' + logo_html + '</li>');


        var extra_data = $.parseJSON(extra_variation_data);
        //extra_data.push({'Logo':embroidered_logo});
        extra_data.Logo = embroidered_logo;
        extra_data = JSON.stringify(extra_data);
        // console.log(extra_data);
        $('#extra_variation_data').val(extra_data);

        var logo = addLogo(embroidered_logo);
        group.add(logo);

    })

    $('.extra-variation-buyerinputfile.file').filer({
        limit: 1,
        maxSize: 2,
        extensions: ["png", "jpeg", "jpg"],
        showThumbs: true,
        addMore: false,
        appendTo: '.fileinput',
        files: null,
        captions: {
            button: '<span class="dashicons dashicons-plus"></span>',
            feedback: "Select transparent background image",
            feedback2: "file were chosen",
            drop: "Drop file here to Upload",
            removeConfirmation: "Are you sure you want to remove this file?",
            errors: {
                filesLimit: "Only {{fi-limit}} file is allowed to be uploaded.",
                filesType: "Only PNG files with transparent background is accepted.",
                filesSize: "{{fi-name}} is too large! Please upload file up to {{fi-fileMaxSize}} MB.",
                filesSizeAll: "Files you've choosed are too large! Please upload files up to {{fi-maxSize}} MB."
            }
        },
        templates: {
            box: '<ul class="jFiler-items-list jFiler-items-default"></ul>',
            item: '<li class="jFiler-item"><div class="jFiler-item-container"><div class="jFiler-item-inner"><div class="jFiler-item-icon pull-left">{{fi-image}}</div><div class="jFiler-item-info pull-left"><div class="jFiler-item-title" title="{{fi-name}}">{{fi-name | limitTo:30}}</div><div class="jFiler-item-others"><span class="jFiler-item-status">{{fi-progressBar}}</span></div><div class="jFiler-item-assets"><div class="list-inline"><a class="icon-jfi-trash jFiler-item-trash-action"><i class="dashicons dashicons-trash"></i></a></div></div></div></div></div></li>',
            itemAppend: '<li class="jFiler-item"><div class="jFiler-item-container"><div class="jFiler-item-inner"><div class="jFiler-item-icon pull-left">{{fi-image}}</div><div class="jFiler-item-info pull-left"><div class="jFiler-item-title">{{fi-name | limitTo:35}}</div><div class="jFiler-item-others"><span class="jFiler-item-status"></span></div><div class="jFiler-item-assets"><div class="list-inline"><a class="icon-jfi-trash jFiler-item-trash-action"><i class="dashicons dashicons-trash"></a></div></div></div></div></div></li>',
            progressBar: '<div class="bar"></div>',
            itemAppendToEnd: false,
            removeConfirmation: true,
            _selectors: {
                list: '.jFiler-items-list',
                item: '.jFiler-item',
                progressBar: '.bar',
                remove: '.jFiler-item-trash-action'
            }
        },
        uploadFile: {
            url: ajaxurl,
            data: { action: 'upload-kippah' },
            type: 'POST',
            enctype: 'multipart/form-data',
            beforeSend: function () { },
            success: function (data, el) {
                var img = $.parseJSON(data);
                var parent = el.find(".jFiler-jProgressBar").parent();
                el.find('.jFiler-item-others').fadeOut('slow');
                el.find('.jFiler-item-title').attr('title', img.title);
                el.find('.jFiler-item-thumb-image img').attr('src', img.logo).addClass('sample-logo').attr('data-logo', img.logo);
                el.find(".jFiler-jProgressBar").fadeOut("fast", function () {
                    //$('<div class="jFiler-item-others text-success"><i class="dashicons dashicons-plus-alt"></i> Success</div>').hide().appendTo(parent).fadeIn("slow");    
                });

                embroidered_logo = img.logo;
                var logo = addLogo(embroidered_logo);
                group.add(logo);
            },
            error: function (el) {
                var parent = el.find(".jFiler-jProgressBar").parent();
                el.find(".jFiler-jProgressBar").fadeOut("fast", function () {
                    $("<div class=\"jFiler-item-others text-error\"><i class=\"fa fa-minus-circle\"></i> Error</div>").hide().appendTo(parent).fadeIn("slow");
                });
            },
            statusCode: null,
            onProgress: null,
            onComplete: null
        },
        onRemove: function (data, el) {
            var img = data.find('.jFiler-item-title').attr('title');
            group.remove(group.getObjectByName('Logo'));
            $.ajax({
                url: ajaxurl,
                method: 'post',
                data: { img: img, action: 'delete-uploaded-img' },
                success: function (resp) {
                    $('.embroidered-logo').html('');
                }
            });
        }
    });




    




    function getColor1(material) {
        jQuery.ajax({
            url: ajaxurl,
            method: 'post',
            data: { color: material, action: 'getcolor1' },
            success: function (resp) {
                jQuery('#color-1').find('.extra-variation-catundertab').html(resp);
            }
        });

    }

    function getColor2(material) {
        jQuery.ajax({
            url: ajaxurl,
            method: 'post',
            data: { color: material, action: 'getcolor2' },
            success: function (resp) {
                jQuery('#color-2').find('.extra-variation-catundertab').html(resp);
            }
        });

    }

    function getColorTrim(material) {
        jQuery('#trim-color').find('.extra-variation-catundertab').html('');
        jQuery.ajax({
            url: ajaxurl,
            method: 'post',
            data: { color: material, action: 'getcolor_trim' },
            success: function (resp) {
                jQuery('#trim-color').find('.extra-variation-catundertab').html(resp);
            }
        });

    }

    $("input[name='attribute_kippah-material']").click(function () {
        var value = $(this).val();
        var price = $(this).data('price');
        var min_qty = $(this).data('min_qty');

        var vid = $(this).data('vid');
        calculate_kippah_price();
        location.href = '/shop/build-kippah/' + value.toLowerCase();
        return false;
    });

    function chunkString(str, length) {
        return str.match(new RegExp('.{1,' + length + '}', 'g'));
    }

    $(document).on('click', '.preview-txt', function (e) {

        e.preventDefault();
        var texts = $('.keyboardInput').val();
        var typeface = $('select[name=Typeface]').val();

        var personaltext = $('.text-content').val();
        var txtColor = $('select.text-color').val();

        var fontType = typeface.replace(/ /g, '');
        txtColor = txtColor.replace(/ /g, '-');

        if (personaltext.length > 100) {
            $.alert({ title: '', content: 'Up to 100 characters only is allowed!', boxWidth: '300px', useBootstrap: false, type: 'dark' });
            return false;
        }

        var ptext = chunkString(personaltext, 33);
        var chunks = '';
        for (var i = 0; ptext.length > i; i++) {
            chunks = chunks + ptext[i].toString();
            if (i < 2) {
                chunks = chunks + '\n\r';
            }
        }
        //chunks = nl2br(chunks,'<br/>');
        addPersonalizedText(chunks, fontType, txtColor);
    })

    if ($('.panel-crumb').hasClass('active')) {
        $('#panel-layout').show();
        $('#rush').hide();
        //renderKippah();
    }
    var value = $("input[type=radio][name=attribute_kippah-material]:checked").val();
    if (value == "Suede") {
        var id = "25";
        var dataid = "25";
        var content = "Yes, please add $25 to my order total for rush processing.";
        var day = '10';
    }
    else {
        id = "50";
        dataid = "50";
        var content = "Yes, please add $50 to my order total for rush processing.";
        var day = '45';
    }
    var now = new Date();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    var future = new Date();


    future.setDate(future.getDate() + 45);
    now.setDate(future.getDate() + 35);
    if(value=='Suede')
    {
      //var clip_summary=''
    var new_a='<div class="cip_holder"><div class="clip_summay"><label for="cars">Kippah clips</label><div class="cip_holder_inner">We will include kippah clips in your order for an additional $0.15 per clip..<br><select name="clipstype" id="clips"><option value="" selected disabled hidden>Please Select</option><option value="gold">Gold</option><option value="Silver">Silver</option> <option value="black">Black</option> <option value="Do not include clips">Do not include clips</option> </select></div></div></div>'
    }
    else{
    var new_a='<div class="cip_holder"><div class="clip_summary"><label for="cars">Kippah clips</label><div class="cip_holder_inner">Regular kippah clips are included in your order at no extra charge. Our Kippah-It On! wig-style clips may be selected, for an additional charge of $1.25 per pair on each kippah.<select name="cliptype" id="clip"><option value="" selected disabled hidden>Please Select</option><option value="Kippah-It On Clips">Kippah-It On! +$1.25</option><option value="Do not include clips">Do not include clips</option><option value="black">Black - FREE!</option><option value="Gold">Gold - FREE!</option> <option value="silver">Silver - FREE!</option>  </select></div></div></div>';
    //var clip_summary='<div class="cip_holder"><div class="clip_summary"><label for="cars">Kippah clips</label><br>Regular kippah clips are included in your order at no extra charge.<br>Our Kippah-It On! wig-style clips may be selected, for an additional charge of $1.25 per pair on each kippah.</div>';
    //var clip = ' <select name="cliptype" id="clip"><option value="Kippah-It On Clips">Kippah-It On! +$1.25</option><option value="Do not include clips">Do not include clips</option><option value="black">Black- FREE!</option><option value="Gold">Gold- FREE!</option> <option value="silver">Silver- FREE!</option>  </select></div>'
    }
       //today.setDate(today.getDate() + 30); </select>'
    //today.setDate(today.getDate() + 30);



    //today.setDate(today.getDate() + 30);
    var htm = '<div class="picked_info"><h2>Your order will be ready for mailing/pickup </h2>' + future + '</div>';
    var html =
        '<aside class="note-important"><p class="subheading">PLEASE NOTE</p><p>Your mailing/pickup date is ' + day + ' days from the date your order is placed, provided that all required information is included when your order is placed (required information includes material, color selection, quantity, personalized text and camera ready artwork for your logo if selected). Any missing information could delay your order (see below).</p></aside>' +
        '<aside class="rush-option"><p class="subheading">RUSH PROCESSING</p><p>For an additional fee of $' + id + ', your order can be processed as a RUSH ORDER, and will be ready for mailing/pickup by Mar 10, 2022. If you require RUSH PROCESSING, please make sure to check the RUSH ORDER option below.</p>' +
        '<label><input type="checkbox" name="rush_picked" id=' + id + ' data-value=' + dataid + ' data-id=' + dataid + ' data-cat="rush" class="rush_picked"><span>' + " " + content + '</span></label></aside></div>';
      //  $(clip_summary).appendTo('.extra_variation_group#rush');
        $(new_a).appendTo('.extra_variation_group#rush');
    $(htm).appendTo('.extra_variation_group#rush');

    $(html).appendTo('.extra_variation_group#rush');
    $('.rush_picked').click(function () {
        if ($(this).is(':checked')) {
            var value = $(this).data('id');
            $('.picked_info').html('<div class="picked_info"><h2>Your order will be ready for mailing/pickup </h2>' + now);
            //  var rush = '50';
            //  var price1 = $(".footer_summary").data('price');
            // new_price = (parseFloat(price1) + parseFloat(value)).toFixed(2);
            // $('#main-div').find('.price').html('<strong>Price:</strong> '+new_price+ '/each');
            $('.footer_summary').find('.rush-price').html('+$' + value + ' Rush Fee');
        }
        else {
            $('.footer_summary .rush-price').html('');
            $('.picked_info').html('<div class="picked_info"><h2>Your order will be ready for mailing/pickup </h2>' + future);

            calculate_kippah_price();
        }
    });

    $(document).tooltip({
        items: ".prod-desc",
        position: {
            my: "center bottom-20",
            at: "center top",
            using: function (position, feedback) {
                $(this).css(position);
                $("<div>")
                    .addClass("arrow")
                    .addClass(feedback.vertical)
                    .addClass(feedback.horizontal)
                    .appendTo(this);
            }
        }
    });

    var selected_panel;
    $('form').trigger("reset");

    $(document).on('change', '#evp_extra_variation input[type=radio]', function () {
        // alert("#evp_extra_variation");
        var fieldName = $(this).attr('data-cat');
        if (fieldName != "Embroidered Logo") {
            calculate_kippah_price();
        }
    });
    $('.switch-wrap1').next('.extra-variation-catundertab').hide();
    $('.toggle-switch1').click(function () {
        var $this = $(this);
        $this.toggle(function () {
            var on = $this.is(':checked');

            var yes_on = $this.parent().find('.yes_on');
            var yes_off = $this.parent().find('.yes_off');
            var catid = $this.attr('value');
            //var old="";
            yes_on.removeClass('active');
            yes_off.removeClass('active');
            //var removeprice = 0;
            //removeprice = dataid;

            //console.log(on);
            //console.log(catid);
            //console.log(yes_on);
            //console.log(yes_off);
            if (on) {
                yes_on.addClass('active');
                yes_on.addClass('active');
                $('#' + catid).find('.extra-variation-catundertab').fadeIn('slow');
                $("input[name='Embossextra']").prop('checked', true);

            } else {
                yes_off.addClass('active');
                $('#' + catid).find('.extra-variation-catundertab').fadeOut('slow');
                // $("input[name='Embossextra']").removeAttr("checked");
                $("input[name='Embossextra']").prop('checked', false);
                $('.logo-title1').text("");
            }
        });
    });
    $('.switch-wrap').next('.extra-variation-catundertab').hide();

    $('.toggle-switch').click(function () {
        var $this = $(this);
        $this.toggle(function () {
            var on = $this.is(':checked');

            var yes_on = $this.parent().find('.yes_on');
            var yes_off = $this.parent().find('.yes_off');
            var catid = $this.attr('value');
            //var old="";
            yes_on.removeClass('active');
            yes_off.removeClass('active');
            //var removeprice = 0;
            //removeprice = dataid;

            //console.log(on);
            //console.log(catid);
            //console.log(yes_on);
            //console.log(yes_off);
            if (on) {

                yes_on.addClass('active');



                $('#' + catid).find('.extra-variation-catundertab').fadeIn('slow');
                // $("input[name='Embroidered Logoextra']").prop('checked', true);
                $(".file-catunderbox").show()
                //$(".file-catunderbox").css("display", "block");
                //$radios.filter('[value=Male]').prop('checked', true);
                // if($("input[name='Embroidered Logoextra']:checked").val()){
                //     e.preventDefault();
                //     addToCart(654);
                //     return false;
                // }
                // else{

                // }
                //old=$("text-content").html();
                //var cookieValues = $("input[name='Embroidered Logoextra']:checked").val()
                //alert(cookieValues);
                //Cookies.set('samuelPrice',cookieValues);

            } else {
                yes_off.addClass('active');
                //alert(catid);
                $('#' + catid).find('.extra-variation-catundertab').fadeOut('slow');
                $('.personalized-text').text("");
                $('#sample-text').text("");
                $('.logo-title').text("");
                $('#csprice').text("");
                $('.extra-variation-buyerinputtextarea').val('');

                $('.brush-script').val('');
                $("input[name='Embroidered Logoextra']").removeAttr("checked");
                // if($("input[name='Embroidered Logoextra']:checked").val() == 'Design for Me-$150.00'){
                // price = -150;
                // //$("input[name='Embroidered Logoextra']").attr("checked", false);

                // $('.logo-title').text("");
                // $('#csprice').text("");
                // }
                // if($("input[name='Embroidered Logoextra']:checked").val() == 'Upload-$0.50'){

                //     price = -0.50;
                //     $('.logo-title').text("");
                //     $('#csprice').text("");
                // }
                // if($("input[name='Embroidered Logoextra']:checked").val() == 'Upload-$0.30'){
                //     price = -0.30;
                //     $('.logo-title').text("");
                //     $('#csprice').text("");
                // }
                calculate_kippah_price();

                // if($("input[name='Text Content']").val()){
                //     alert('hello');
                // $('.personalized-text').text("");
                // }

                //price = price-removeprice;

                //$this.closest('div').find("input[type=text],input[type=radio], textarea, select").val("");
                //$('#sample-text').text("");
                //$('.'+catid).text('');
            }
        });
    });
    $('.toggle-switch3').click(function () {
        var $this = $(this);
        $this.toggle(function () {
            var on = $this.is(':checked');

            var yes_on = $this.parent().find('.yes_on');
            var yes_off = $this.parent().find('.yes_off');
            var catid = $this.attr('value');
            //var old="";
            yes_on.removeClass('active');
            yes_off.removeClass('active');

            if (on) {

                $('.next-btn>a').removeClass('active');
                yes_on.addClass('active');
                $('#' + catid).find('.extra-variation-catundertab').fadeIn('slow');
                $('.file-catunderbox').hide();
                $('.special-instructions-catunderbox').hide();
                $('file.extra-variation-buyerinputfile').attr('disabled');
                var price = $("#logo_price").val();
                // $('#order-summary').find('.embroidered-logo .logo-title2').html('<strong>Embroidered Logo:</strong>$0.50'); 
                var emb_price = '0.50';
                var price1 = $(".footer_summary").data('price');
                new_price = (parseFloat(price1) + parseFloat(emb_price)).toFixed(2);
                $('#main-div').find('.price').html('<strong>Price:</strong> ' + new_price + '/each');

            } else {
                yes_off.addClass('active');
                $('.next-btn>a').addClass('active');
                //alert(catid);
                $('#' + catid).find('.extra-variation-catundertab').fadeOut('slow');
                $('.logo-title').text("");
                $('.extra-variation-buyerinputtextarea').val('');
                $("input[name='Embroidered Logoextra']").removeAttr("checked");
                $('.logo-title2').text("");
                $('.extra-variation-buyerinputtextarea').val('');
                // if($("input[name='Embroidered Logoextra']:checked").val() == 'Design for Me-$150.00'){
                // price = -150;
                // //$("input[name='Embroidered Logoextra']").attr("checked", false);

                // $('.logo-title').text("");
                // $('#csprice').text("");
                // }
                // if($("input[name='Embroidered Logoextra']:checked").val() == 'Upload-$0.50'){

                //     price = -0.50;
                //     $('.logo-title').text("");
                //     $('#csprice').text("");
                // }
                // if($("input[name='Embroidered Logoextra']:checked").val() == 'Upload-$0.30'){
                //     price = -0.30;
                //     $('.logo-title').text("");
                //     $('#csprice').text("");
                // }
                calculate_kippah_price();

                // if($("input[name='Text Content']").val()){
                //     alert('hello');
                // $('.personalized-text').text("");
                // }

                //price = price-removeprice;

                //$this.closest('div').find("input[type=text],input[type=radio], textarea, select").val("");
                //$('#sample-text').text("");
                //$('.'+catid).text('');
            }
        });
    });


    function calculate_kippah_price() {
        var price = $("input[name='attribute_kippah-material']:checked").data('price');
        //console.log(price_e);
        // if($("input[name='Embroidered Logoextra']:checked").val() == 'Design for Me-$150.00'){
        //     console.log($("input[name='Embroidered Logoextra']:checked").val());
        // }
        $("#evp_extra_variation input[type=radio]").each(function (i, e) {
            if ($(this).is(':checked')) {
                var dataid = $(this).data('id');
                price = (parseFloat(price) + parseFloat(dataid)).toFixed(2);
                $(".footer_summary").data("price", price);
            }


        });
        $('#main-div').find('.price').html('<strong>Price:</strong> ' + price + '/each');
    }



    $('.next-btn>a').on('click', function (e) {
        e.preventDefault();
        $('#top-trim h5').text('Trim Layout');
        //console.log($('#top-trim h5').contents(':contains("Top Trim")')[0].nodeValue ='Trim Layout');
        //var url = window.location.href;
        var url = window.location.pathname;
        //alert(url); 
        var cur_step = $(this).data('step');
        var urls = [
            "http://coolkippahs.jobase.io/shop/build-kippah/felt/",
            "http://coolkippahs.jobase.io/shop/build-kippah/suede/",
            "http://coolkippahs.jobase.io/shop/build-kippah/knit/"
        ];
        var url = window.location.href;
        //alert(cur_step);
        var hideSizeForFlet = 0;
        var min_qty = $("input[name='attribute_kippah-material']:checked").data('min_qty');
        //alert(customoption);
        for (var i = 0; i < urls.length; i++) {
            if (url == urls[i] && cur_step == 5) {
                //alert('felt in');
                cur_step = 6;
                customoption = "lining";
                hideSizeForFlet = 1;
            }
        }
        /* if(customoption=="lineing" && cur_step==5){
             cur_step=6;
             customoption="lining";
             hideSizeForFlet=1;
             alert("test1");
         }else{
             alert("test2");
         }*/
        switch (cur_step) {
            case 1:
                $('.variation-wrapper').fadeOut('slow', function () {

                    $('#panel-layout').fadeIn('slow', function () {
                        $('.kippah-image-model').fadeIn('slow');
                    });

                });

                $('.panel-crumb').addClass('active');
                $(this).data('step', 2);
                break;
            case 2:
                selected_panel = $('#panel-layout input[type=radio]:checked');
                if (selected_panel.length < 1) {
                    return false;
                }

                $('#panel-layout').hide();
                $('#sizeing').hide();
                $('#sizeing1').hide();
                $('#sizeing2').hide();
                $('#rush').hide();
                $('#suede-trim').hide();
                $('#color-1').show();
                $('#color-1').find('.extra-variation-catundertab').fadeIn();
                var color1 = $('#color-1 input[type=radio]:checked').length;
                var color2 = $('#color-2 input[type=radio]:checked').length;
                if (selected_panel.val() != 'Single Color') {

                    if (color2 < 1) {
                        $(this).removeClass('active');
                    }
                }
                if (color1 < 1) {
                    $(this).removeClass('active');
                }

                $('.color-crumb').addClass('active');
                var value = $("input[type=radio][name=attribute_kippah-material]:checked").val();
                if (value != 'Mesh') {
                    $(this).data('step', 3);
                }
                else {
                    $(this).data('step', 4);
                }

                break;
            case 3:
                var color1 = $('#color-1 input[type=radio]:checked').length;
                var color2 = $('#color-2 input[type=radio]:checked').length;
                if (selected_panel.val() != 'Single Color' && (color1 < 1 || color2 < 1)) {
                    return false;
                }
                if (selected_panel.val() == 'Single Color' && color1 < 1) {
                    return false;
                }

                $('#color-1').hide();
                $('#color-2').hide();
                $('#sizeing1').hide();
                //$('#sizeing').hide();
                $('#rush').hide();
                $('#emboss').hide();
                $('#pattern-color').hide();
                $('#trim-color').show('slow');
                $('#suede-trim').show('slow');

                var trim_color = $('#trim-color input[type=radio]:checked').length;
                var suede_trim = $('#suede-trim input[type=radio]:checked').length;
                if (trim_color < 1 && suede_trim < 1) {
                    $(this).removeClass('active');
                }
                $('.trimcolor-crumb').addClass('active');
                $(this).data('step', 4);

                break;
            case 4:
                $('#color-1').hide();
                $(this).removeClass('active');
                $('#trim-color').hide();
                $('#suede-trim').hide();
                $('#top-trim').hide();
                // if(hideSizeForFlet==1){
                //     $('#size').hide(); 
                // }
                $('#size').show('slow');
                $('#size').addClass('size-change');
                $('#sizeing').show('slow');
                $('#sizeing1').show('slow');
                $('#sizeing2').show('slow');
                //$('#'+customsize).show('slow');
                var size = $('#size input[type=number]').length;
                $('.size-crumb').addClass('active');
                $(this).data('step', 5);
                 break;
          
 case 5:
            // $(document).on('change','.size-change input[type=number]',function(){ 
            // var value = $(this).val();
            // var name = $(this).data('name');
            // var price = $(this).data('id');
            // var parent = $(this).data('parentname');
            // var cat = $(this).data('cat');      
            // var min_qty = $("input[name='attribute_kippah-material']:checked").data('min_qty'); 

            // //alert(name+"="+price+"="+parent+"="+cat+"="+min_qty);
            // if($(this).is(':enabled')==false){
            //     return false;
            //     }
            // var  total_qty = 0;
            // var checked_sizes = $('#size input[type=number]:enabled');
            // checked_sizes.each(function(i,sz){  
            //     const inputVal = parseInt($(sz).val());
            //     if (!isNaN(inputVal)) {
            //     total_qty = total_qty + parseInt($(sz).val());
            //     }
            // });
            // // cvalue = min_qty - cvalue
            //     $('input[name=quantity]').val(parseInt(value));
            
            
            // //    $('input[name=quantity]').val(total_qty);
            // //    alert(total_qty);
            
            // $('.next-btn.centurygothic.active').addClass('size-alert')
            // $('.next-btn.centurygothic.active.size-alert').click(function(){
            //     // alert("hi");
            //     // alert(total_qty);
            //     if((total_qty < min_qty) || (total_qty > min_qty)) {
            //         // alert(total_qty);
            //         // alert(min_qty);
            //         $.alert({title:'',content:'Minimum quantity is '+ min_qty,boxWidth:'300px',useBootstrap:false,type:'dark'});
            //         // exit();
            //     }
            // });
            // //    if(total_qty!="" && (total_qty < min_qty)){
            //     //    $(this).val(parseInt(min_qty));
            //         // $.alert({title:'',content:'Minimum quantity is '+ min_qty,boxWidth:'300px',useBootstrap:false,type:'dark'});
            //         //    return false;
            //     // }
            // //    else if (total_qty!="" && (total_qty > min_qty)) {
            //         // $.alert({ title: '', content: 'Minimum quantity is ' + min_qty, boxWidth: '300px', useBootstrap: false, type: 'dark' });
            //         // return false;
            //     // }
                    
            // $('#order-summary').find('.'+parent+'-qty').text(value);	
            // //    $('.next-btn>a').addClass('active');
            // if (total_qty == min_qty) {
            //     $('.next-btn>a').addClass('active');
            // } else {
            //     $('.next-btn>a').removeClass('active');
            // }
            // return false;
            
            // });
                // if(!$('#lining').length){
                //     $(this).data('step',6).trigger('click');
                // }    
                            var value = $("input[type=radio][name=attribute_kippah-material]:checked").val();
                 if (! (value == 'Felt' || value == 'Suede') )
               {
                
                       $(this).removeClass('active');
                $('#size input[type=number]:enabled').trigger('keyup mouseup');
                $('#size').hide();
                $('#sizeing').hide();
                $('#sizeing1').hide();
                $('#sizeing2').hide();
                //$('#'+customsize).hide();
                $('#' + customoption).show('slow');
                //$('#lineing').show('slow');  
                $('.lining-crumb').addClass('active');
                $('.Lineing-crumb').addClass('active');
                $(this).data('step', 6);
                  break;
            }
            
                else{
                   // alert("pqr");
              $(this).removeClass('active');
                $('#size input[type=number]:enabled').trigger('keyup mouseup');
                $('#size').hide();
                $('#sizeing').hide();
                $('#sizeing1').hide();
                $('#sizeing2').hide();
                //$('#'+customsize).hide();
               // $('#' + customoption).show('slow');
                //$('#lineing').show('slow');  
              //  $('.lining-crumb').addClass('active');
             //  $('.Lineing-crumb').addClass('active');
 $('#personalized-text').show('slow');
                $('#embroidered-logo').show('slow');
                $('.personalize-crumb').addClass('active');
     $('.next-btn>a').addClass('active');

                $(this).data('step', 7);
                                break;

            }

            case 6:
                $('.next-btn.centurygothic.active').removeClass('size-alert')
                camera.position.set(-200, 100, 1);
                controls.update();
                $('#' + customoption).slideUp();
                $('#lineing').slideUp();
                if (hideSizeForFlet == 1) {
                    $('#size').hide();
                    $('#sizeing').hide();
                    $('#sizeing1').hide();
                    $('#sizeing2').hide();
                }
                $('#personalized-text').show('slow');
                $('#embroidered-logo').show('slow');
                $('.personalize-crumb').addClass('active');
                $(this).data('step', 7);
                break;
            case 7:
			 $('.next-btn>a').removeClass('active');
                $('#personalized-text').hide();
                $('#embroidered-logo').hide();
                $('#rush').show('slow');
                //  $('#rush').append('<h2>Your order will be ready for mailing/pickup Mar 20, 2022</h2><div>Your mailing/pickup date is 45 days from the date your order is placed, provided that all required information is included when your order is placed (required information includes material, color selection, quantity, personalized text and camera ready artwork for your logo if selected). Any missing information could delay your order (see below).</div>');
                $('.rush').addClass('active');
                $(this).data('step', 9);
                break;
		    case 9:
			
            //$('.next-btn>a').removeClass('active');
        
             $.alert({title:'',content:'Please select clip first!',boxWidth:'300px',useBootstrap:false,type:'dark'});
                break;
            case 8:
			    $('.next-btn>a').addClass('active');
                camera.position.set(-200, 100, 1);
                controls.update();
                imgData = renderer.domElement.toDataURL('image/png');
                var block = imgData.split(",");
                // get the real base64 content of the file
                var realData = block[1];
                //console.log(realData);
                // console.log($('#threedmodel').val(realData));
                $('#threedmodel').val(realData);
                var formdata = $('form.cart');

                var formdata1 = $('form.cart').serializeArray()
                $.each(formdata1, function (i, field) {
                    if (field.name == "Embroidered Logoextra") {
                        embroideredValue = field.value
                    }
                });
                /*var EmbroideredValue = $("input['name=Embroidered Logoextra']").val();
                alert(EmbroideredValue);*/

                if (embroideredValue != "") {
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "/wp-admin/admin-ajax.php",
                        data: { action: "custome_add_to_cart", embroideredValue: embroideredValue },
                        success: function (response) {
                            // alert(response);
                            //console.log(response);
                            formdata.submit();
                        }
                    });
                } else {
                    formdata.submit();
                }
                break;
        }


    });

    $('.color-crumb>a').on('click', function (e) {
        e.preventDefault();
        var active_panel = $('.panel-crumb').hasClass('active');
        if (active_panel) {
            $('.personalize-crumb').removeClass('active');
            $('.trimcolor-crumb').removeClass('active');
            $('.size-crumb').removeClass('active');
            $('.lining-crumb').removeClass('active');
            $('.Lineing-crumb').removeClass('active');
            $('#size').hide();
            $('#trim-color').hide();
            $('#top-trim').hide();
            $('#pattern-color').hide();
            $('#personalized-text').hide();
            $('#embroidered-logo').hide();
            $('#' + customoption).hide();
            // $('#lineing').hide(); 
            $('#emboss').hide();
            $('.next-btn>a').data('step', 2).trigger('click');
        }
    })

    $('.trimcolor-crumb>a').on('click', function (e) {
        e.preventDefault();
        var active_panel = $('.color-crumb').hasClass('active');
        if (active_panel) {
            $('.personalize-crumb').removeClass('active');
            $('.size-crumb').removeClass('active');
            $('#size').hide();
            $('#personalized-text').hide();
            $('#embroidered-logo').hide();
            $('#' + customoption).hide();
            //$('#lineing').hide(); 
            $('#trim-color').show();
            $('.lining-crumb').removeClass('active');
            $('.Lineing-crumb').removeClass('active');
            $('.next-btn>a').data('step', 3).trigger('click');
        }
    })


    $('.size-crumb>a').on('click', function (e) {
        e.preventDefault();
        var active_panel = $('.trimcolor-crumb').hasClass('active');
        if (active_panel) {
            $('.personalize-crumb').removeClass('active');
            $('#personalized-text').hide();
            $('#embroidered-logo').hide();
            $('#' + customoption).hide();
            //$('#lineing').hide(); 
            $('#size').show('slow');
            $('.next-btn>a').data('step', 4);
            $('.lining-crumb').removeClass('active');
            $('.Lineing-crumb').removeClass('active');
            $('.next-btn>a').trigger('click');
        }
    })

    $('.lining-crumb>a').on('click', function (e) {
        e.preventDefault();
        var active_panel = $('.color-crumb').hasClass('active');
        if (active_panel) {
            $('.next-btn.centurygothic.active').removeClass('size-alert')
            $('.personalize-crumb').removeClass('active');
            $('#color-1').hide();
            $('#color-2').hide();
            $('#size').hide();
            $('#trim-color').hide();
            $('#personalized-text').hide();
            $('#embroidered-logo').hide();
            $('.next-btn>a').data('step', 5);
            $('.next-btn>a').trigger('click');
        }
    })

    $('.panel-crumb>a').on('click', function (e) {
        e.preventDefault();
        var selected_material = $("input[name='attribute_kippah-material']").is(':checked');
        if (selected_material) {

            $('.personalize-crumb').removeClass('active');
            $('.trimcolor-crumb').removeClass('active');
            $('.size-crumb').removeClass('active');
            $('.color-crumb').removeClass('active');
            $('.lining-crumb').removeClass('active');
            $('.Lineing-crumb').removeClass('active');
            $('#personalized-text').hide();
            $('#embroidered-logo').hide();
            $('#color-1').hide();
            $('#color-2').hide();
            $('#trim-color').hide();
            $('#top-trim').hide();
            $('#emboss').hide();
            $('#pattern-color').hide();
            $('#suede-trim').hide();
            $('#' + customoption).hide();
            //$('#lineing').hide(); 
            $('#size').hide();
            $('.next-btn>a').data('step', 1);
            $('.next-btn>a').trigger('click');
        }
    })

    $('.personalize-crumb>a').on('click', function (e) {
        e.preventDefault();
        var active_panel = $('.lining-crumb').hasClass('active');
        if (active_panel) {
            $('#size').hide();
            $('.next-btn>a').trigger('click');
            $('.next-btn a').removeClass('active');
        }
    })


    function formatState(data) {

        var elem_class = $(data.element).data('class');
        var html = "<div class='" + elem_class + "'>" + data.text + "</div>";
        data.text = html;
        return data.text;
    }
    var typeface = $('select.typeface').select2({
        templateResult: formatState,
        escapeMarkup: function (data) {
            return data;
        },
        minimumResultsForSearch: -1
    });
    var pathname1 = window.location.pathname;
    if (pathname1 == '/shop/build-kippah/suede/') {
        //alert(pathname1);
        $('.black').remove();
        $('.navy-blue').remove();
        $('.royal-blue').remove();
        $('.steel-blue').remove();
        $('.light-blue').remove();
        $('.virdian').remove();
        $('.green').remove();
        $('.slate-grey').remove();
        $('.carmine').remove();
        $('.burgundy').remove();
        $('.cardinal').remove();
        $('.orange').remove();
        $('.pink').remove();
        $('.grey').remove();
        $('.khaki').remove();
        $('.dark-tan').remove();
        $('.yellow').remove();
        $('.white').remove();
    }
    var pathname = window.location.pathname;
    // if(pathname == '/shop/build-kippah/ultra%20suede/'){
    // $('select.text-color option[value="White"]').remove();
    // }
    var textColor = $('select.text-color').select2({

        templateResult: formatState,
        escapeMarkup: function (data) {
            // if(url == 'http://coolkippahs.jobase.io/shop/build-kippah/ultra%20suede/'){
            //     //if($(data).hasClass('white')){
            //     $('.white').hide();
            //     //}
            // }
            // console.log(url);
            //console.log(data);
            return data;
        },
        minimumResultsForSearch: -1
    });

    typeface.on('select2:select', function (e) {
        // alert("kippah_builder");
        var data = e.params.data;
        var elem_class = $(data.element).data('class');
        $("#sample-text").attr('class', elem_class);
        $('.text-content').removeClass('keyboardInput');
        $('.keyboardInputInitiator').remove();
        if (elem_class == $(data.element).data('class')) {
            $("#sample-text").text('');
            $('textarea.text-content').val('');
            $('.text-content').addClass('keyboardInput');
            buildKeyboardInputs();
        }
        var fontface = $(this).val();
        var fontfacecss = fontface.replace(/ /g, '');
        var txtColor = $('select.text-color').val();
        txtColor = txtColor.replace(/ /g, '-');
        var content = $('textarea.text-content').val();
        $("#sample-text").attr('class', fontfacecss + ' ' + txtColor.toLowerCase());
        $('#order-summary').find('.personalized-text').html('<strong>Personalized Text:</strong><br> Type Face: ' + fontface + '<br> Color: ' + txtColor + '<br> Text: ' + content);
    });

    $(".extra-variation-buyerinput textarea ").after("<span class='keyboardInputInitiator'>Hello</span>")

    $('.text-content').removeClass('keyboardInput');
    $('.keyboardInputInitiator').remove();
    $("#sample-text").text('');
    $('textarea.text-content').val('');
    $('.text-content').addClass('keyboardInput');
    buildKeyboardInputs();
    // $(typeface).val("Sheer Elegance ").select2().trigger('select');

    textColor.on('select2:select', function (e) {
        var data = e.params.data;
        var elem_class = $(data.element).data('class');
        var typeface = $('select[name=Typeface]').val();
        var txtColor = $(this).val();
        var fontfacecss = typeface.replace(/ /g, '');
        // alert(txtColor);
        $("#sample-text").removeClass();
        $("#sample-text").attr('class', elem_class + ' ' + fontfacecss);

        var content = $('textarea.text-content').val();
        $('#order-summary').find('.personalized-text').html('<strong>Personalized Text:</strong><br> Type Face: ' + typeface + '<br> Color: ' + txtColor + '<br> Text: ' + content);
    });

    $(document).on('click', '.sample-kipph-size', function (e) {
        e.preventDefault();
        $.alert({
            title: 'Sample',
            content: 'Loading...',
            onContentReady: function () {
                var self = this;
                this.setContent('<img src="/wp-content/uploads/2021/01/coolkippahs-sizing-diagram.gif"/>');
            },
            boxWidth: '680px',
            useBootstrap: false,
            type: 'dark'
        });
    });

    $(document).on('click', '.panel-selected img', function (e) {
        e.preventDefault();
        var img_src = $(this).attr('src');
        $.alert({
            title: '',
            content: 'Loading...',
            onContentReady: function () {
                var self = this;
                self.buttons.ok.hide();
                this.setContent('<img width="500" src="' + img_src + '"/>');
            },
            boxWidth: '500px',
            useBootstrap: false,
            type: 'dark',
            closeIcon: true
        });
    })

    $("#" + customoption).find("h5").text('Lining');
    // $("#"+customsize.find("h5").text('size');  
    $('select#clip'). change(function(){
        $('.next-btn>a').data('step', 8);
        var val= $('#clip option:selected').text();
     //alert(val);
            // $('#order-summary').after('<strong>Clip Color:</strong> ' + val);
              $('#order-summary').find('.clip').html('<strong>Clip Color:</strong> ' +val);
     if($('option:selected', this).text()=="Kippah-It On! +$1.25")
     {
         //alert("hi");
               var clip_price = '1.25';
                     var price1 = $(".footer_summary").data('price');
                     //alert(price1);
                     new_price = (parseFloat(price1) + parseFloat(clip_price)).toFixed(2);
                     $('#main-div').find('.price').html('<strong>Price:</strong> ' + new_price + '/each');
     }
     else{
                         var price1 = $(".footer_summary").data('price');
                         $('#main-div').find('.price').html('<strong>Price:</strong> ' + price1 + '/each');
     }
     });
    $('select#clips'). change(function(){
        $('.next-btn>a').data('step', 8);
		 $('.next-btn>a').addClass('active');
        var val= $('#clips option:selected').text();
     //alert(val);
            // $('#order-summary').after('<strong>Clip Color:</strong> ' + val);
              $('#order-summary').find('.clip').html('<strong>Clip Color:</strong> ' +val);
     if($('option:selected', this).text()=="Do not include clips")
     {
         //alert("hi");
          var price1 = $(".footer_summary").data('price');
                         $('#main-div').find('.price').html('<strong>Price:</strong> ' + price1 + '/each');
              
     }
     else{
                   var clip_price = '0.15';
                     var price1 = $(".footer_summary").data('price');
                     //alert(price1);
                     new_price = (parseFloat(price1) + parseFloat(clip_price)).toFixed(2);
                     $('#main-div').find('.price').html('<strong>Price:</strong> ' + new_price + '/each');      
     }
     });

    if(jQuery("input[name='Suede Trimextra']").prop('checked', true)){
        jQuery("input[name='Trim Colorextra']").prop('checked', false);
    }
    

});

