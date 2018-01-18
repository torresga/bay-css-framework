
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();

$(document).ready(
    function(){
        $('.video_pop').fancybox();

        var section = $('.content').attr('id');
        $('.main_navigation').find('.'+section+'_links').addClass('active');
    }
);


    $(document).ready(function() {

        $('.custom-style-dropdown').customStyle();
        //Global Search
        if ($("#search").length) {
            var search = getURLParameterByName('q');

            if (search != '') {
                putToTheSearchField(search.replace('"', ''));
            }
        }

        $('.text_size a').click(function(e) {

            $('.text_size a').removeClass('current');
            $('body').removeAttr('class');
            $('body').addClass($(this).attr('class'));
            $(this).addClass('current');
            e.preventDefault();

        });


        if ($('.tab').length > 0) {

            $('.tab').hide();
            $('#tab-nav a').click(function(e) {
                e.preventDefault();
                var TabID = $(this).attr("href").replace("#", "");
                $('#tab-nav li').removeClass("ui-state1-active");
                $(this).parent().addClass("ui-state1-active");
                $('.tab').hide();
                $('#' + TabID).show();

            });
            if (location.href.indexOf("#") != -1) { //somehow location.hash not workign in IE7

                // alert(LocationID);
                var CareerAreaID = location.hash;
                $('#tab-nav a').each(function(index) {
                    var vHref = $(this).attr("href");
                    if (vHref == CareerAreaID) {
                        $(this).trigger('click');

                    }
                });
            }
            else {
                $('#tab-nav a:first').trigger('click'); //TO open the 1st one
            }
        }



        //Fitfinder destination URL
        var destTBURL = 'http://jobs.bayada.com/search/advanced-search/ASCategory/[#catg]/ASPostedDate/-1/ASCountry/USA/ASState/[#state]/ASCity/[#city]/ASLocation/-1/ASCompanyName/-1/ASCustom1/-1/ASCustom2/-1/ASCustom3/-1/ASCustom4/-1/ASCustom5/-1';
        //var destTBURL = 'http://jobs.bayada.com/search/advanced-search/ASCategory/[#catg]/ASPostedDate/-1/ASCountry/-1/ASState/[#state]/ASCity//ASLocation/-1/ASCompanyName/-1/ASCustom1/-1/A';


        //Home page Search availabel jobs
        $('#search-available-jobs a').click(function(e) {
            e.preventDefault();
            var Category = $('.ddl-category').val();
            var Location = $('.ddl-location').val();
            var City = $('#ddl-city').val();


            if (Category == "" || Location == "" || City == "") {
                alert("Please select Category, State and City!");
                return;
            }
            var destURL = destTBURL.replace("[#catg]", Category);
            var destURL = destURL.replace("[#state]", Location);
            var destURL = destURL.replace("[#city]", City);
            //alert("opening -> " + destURL);
            window.open(destURL);
            //alert(cityVal);

        });

        //Home page state selection
        $('#search-available-jobs .ddl-location').change(function(e) {

            var ctrID = $(this).attr("id");

            var SrvURL = '/app/career-fit-finder/services/feed.aspx?srv=cityhome&sid=' + $(this).val().replace(" ", "%20");
            //Load City
            $('#ddl-city').load(SrvURL, function() {
            });

        });


        //FitFinder Slider
        $('#nurse-fitfinder-go').click(function(e) {

            //GA event Track
            _gaq.push(['_trackEvent', 'NurseFitFinder', location.href, '']);


            $('#profile-wrapper').hide();
            //Get Values
            $('#nurse-fit-finder-expand').addClass("fit-finder-on");

            var workEnviormentID = $('.ddl-work-enviorment').val();
            var degreeID = $('.ddl-degree').val();
            var experienceID = $('input:radio[name="ctl00$rbtExperience"]:checked').val();

            if (workEnviormentID == "" || degreeID == "" || (experienceID == "undefined") || experienceID == null) {

                alert("Please complete your selection to continue");
                return false;
            }


            //GA Event tracking
            var SelValueENV = $('.ddl-work-enviorment option:selected').text();

            _gaq.push(['_trackEvent', 'PREFERRED_WORK_ENVIORNMENT', SelValueENV, '']);

            var SelValueLIC = $('.ddl-degree option:selected').text();

            _gaq.push(['_trackEvent', 'LICENSE_CERTIFICATION', SelValueLIC, '']);


            _gaq.push(['_trackEvent', 'EXPERIENCE', experienceID, '']);

            e.preventDefault();
            var sWidth = 500;


            $('#nurse-fit-finder-expand #accordion').remove();
            $('#nurse-fit-finder-expand').append("<div id='accordion'> <span class='progress'>Loading .....</span> </div>");
            var $Accordion = $('#nurse-fit-finder-expand #accordion');

            $Accordion.load('/app/career-fit-finder/services/feed.aspx?srv=catg&weid=' + workEnviormentID + '&did=' + degreeID + '&sid=' + experienceID + '', function() {

                if ($Accordion.find('h3').length == 0) {
                    $Accordion.html("<span>No match foudn for the selection.</span>");
                    $('.result-count span').html("0");
                }
                else {
                    $('.result-count span').html($Accordion.find('h3').length);
                }

                $Accordion.accordion({ active: 0 });

                $('.ddl-state').change(function() {

                    var ctrID = $(this).attr("id");
                    var ddlCityID = ctrID.replace("ddl-state", "ddl-city");
                    var SrvURL = '/app/career-fit-finder/services/feed.aspx?srv=city&sid=' + $(this).val().replace(" ", "%20");
                    //Load City
                    $('#' + ddlCityID).load(SrvURL, function() {
                    });

                });

                $('.tb-go').click(function(e) {

                    e.preventDefault();
                    var goID = $(this).attr("id");
                    var ctrState = goID.replace("lnk-tb", "ddl-state");
                    var ctrCity = goID.replace("lnk-tb", "ddl-city");
                    var ctrCatg = goID.replace("lnk-tb", "hid-catg");

                    if ($('#' + ctrState).val() == "" || $('#' + ctrCity).val() == "") {

                        alert("Please select State and Location to continue");
                        return;
                    }

                    var destURL = destTBURL.replace("[#catg]", $('#' + ctrCatg).val());
                    var destURL = destURL.replace("[#state]", $('#' + ctrState).val());
                    var destURL = destURL.replace("[#city]", $('#' + ctrCity).val());
                    //alert("opening -> " + destURL);
                    window.open(destURL);
                    //alert(cityVal);

                });

            });


            $("#nurse-fit-finder-expand").animate({
                width: 500
            }, 500, 'easeOutCirc', function() {

            });


        });

        $('#nurse-fit-finder-expand #close').click(function(e) {

            e.preventDefault();

            $('#nurse-fit-finder-expand').removeClass("fit-finder-on");
            $("#nurse-fit-finder-expand").animate({
                width: 0
            }, 500, 'easeOutCirc', function() {

            });
        });





        //handling home page profile click


        $('.headline a').click(function(e) {



            $('#nurse-fit-finder-expand').css("width", 0);
            e.preventDefault();
            var ProfileID = $(this).attr("href").replace("#", "");
            //GA event Track
            _gaq.push(['_trackEvent', 'Profile Animation', ProfileID, '']);
            CurrentSlide = parseInt(ProfileID.replace("profile", ""));

            AutoSlideNo = CurrentSlide;

            loadProfile(ProfileID);
            //This is the place we need to add auto rotation
            timerAuto = setInterval("autoLoadProfile()", 15000);


        });
        $('.home-profiles .close').click(function(e) {

            e.preventDefault();
            resetProfile();

        });

        $('#profile-nav a').click(function(e) {
            e.preventDefault();
            var ProfileID = $(this).attr("href").replace("#", "");
            CurrentSlide = ProfileID.replace("profile", "");
            resetProfileNav(ProfileID);
            loadProfile(ProfileID);
            if (timerAuto != null) {
                clearInterval(timerAuto);
                //timerAuto = setTimeout("autoLoadProfile()", 10000);
            }

        });
    });


    autoLoadProfile = function() {
        //not doing generic here as we have defind set of profile 3

        AutoSlideNo = AutoSlideNo + 1;
        if (AutoSlideNo > 3)
            AutoSlideNo = 1;
        //alert(CurrentSlide);
        //alert(AutoSlideNo);
        if (AutoSlideNo == CurrentSlide) {

            clearInterval(timerAuto);
            setTimeout("resetProfile()", 1000);
            return;
        }
        var ProfileID = "profile" + AutoSlideNo;
        resetProfileNav(ProfileID);
        loadProfile(ProfileID);
        //alert("aa -- " + AutoSlideNo);
    };


    var CurrentSlide = 1;
    var AutoSlideNo = 0;
    var timerAuto = null;
    var timer1 = null;
    var timer2 = null;
    var timer3 = null;

    //Define the left position of each quote
    var htQuoteP = {};
    htQuoteP['profile1_slid1'] = '239';
    htQuoteP['profile1_slid2'] = '234';
    htQuoteP['profile1_slid3'] = '208';
    htQuoteP['profile1_slid4'] = '239';
    htQuoteP['profile1_slid5'] = '198';
    htQuoteP['profile1_slid6'] = '185';

    htQuoteP['profile2_slid1'] = '244';
    htQuoteP['profile2_slid2'] = '231';
    htQuoteP['profile2_slid3'] = '287';
    htQuoteP['profile2_slid4'] = '284';
    htQuoteP['profile2_slid5'] = '194';
    htQuoteP['profile2_slid6'] = '227';

    htQuoteP['profile3_slid1'] = '195';
    htQuoteP['profile3_slid2'] = '222';
    htQuoteP['profile3_slid3'] = '229';
    htQuoteP['profile3_slid4'] = '273';
    htQuoteP['profile3_slid5'] = '225';
    htQuoteP['profile3_slid6'] = '229';

    var CurrentProfileID = "";

    loadProfile = function(ProfileID) {

        CurrentProfileID = ProfileID;
        $('#profile-wrapper').show();

        $('#' + ProfileID).animate({ height: 588 }, 800, 'easeInCirc', function() {
            //Get profile ID
            var ProfileNum = ProfileID.replace("profile", "");
            animSet1(ProfileNum);
            timer1 = setTimeout("animTxtCompation()", 1000);

            //Show the pagination
            $('#profile-nav').fadeIn(800);
            $('#profile-nav li').removeClass("active");
            $('#profile-nav-' + ProfileNum).addClass("active");

            $('#search-available-jobs').hide();

        });
    };

    animSet1 = function(vProfileNum) {

    $('#profile' + vProfileNum + '_slid1').animate({ left: htQuoteP['profile' + vProfileNum + '_slid1'] }, 1000, 'easeOutCirc', function() {

        $('#profile' + vProfileNum + '_slid2').animate({ left: htQuoteP['profile' + vProfileNum + '_slid2'] }, 1000, 'easeOutCirc', function() {
                timer2 = setTimeout("animSet2('" + vProfileNum + "')", 1000)
            });
        });
    };

    animSet2 = function(vProfileNum) {

    $('#profile' + vProfileNum + '_slid3').animate({ left: htQuoteP['profile' + vProfileNum + '_slid3'] }, 1000, 'easeOutCirc', function() {

    $('#profile' + vProfileNum + '_slid4').animate({ left: htQuoteP['profile' + vProfileNum + '_slid4'] }, 1000, 'easeOutCirc', function() {
             timer3 =  setTimeout("animSet3('" + vProfileNum + "')", 1000)
            });
        });
    };

    animSet3 = function(vProfileNum) {

        $('#profile' + vProfileNum + '_slid5').animate({ left: htQuoteP['profile' + vProfileNum + '_slid5'] }, 1000, 'easeOutCirc', function() {

            $('#profile' + vProfileNum + '_slid6').animate({ left: htQuoteP['profile' + vProfileNum + '_slid6'] }, 1000, 'easeOutCirc', function() {

            });
        });
    };


    animTxtCompation = function() {

        $('#txt-compation').animate({ left: 180 }, 1500, 'easeOutCirc', function() {

        });

    };


    resetProfile = function() {

        $('#profile-wrapper').fadeOut(500);
        $('.home-profiles').css("height", 0);
        $('#profile-nav').hide();
        $('#search-available-jobs').show();
        resetProfileGen();

    };

    resetProfileNav = function(ProfileID) {

        $('#profile-nav').fadeOut(800);
        $('.home-profiles').css("z-index", 10);
        $('#' + ProfileID).css("height", 0);
        $('#' + ProfileID).css("z-index", 15);

        resetProfileGen();
    };

    resetProfileGen = function() {

        $('.home-profiles .left').each(function(index) {
            $(this).css("left", -399);
        });
        $('.home-profiles .right').each(function(index) {
            $(this).css("left", 899);
        });
        if (timer1 != null) {
            clearTimeout(timer1);
            timer1 = null;
        }
        if (timer2 != null) {
            clearTimeout(timer2);
            timer2 = null;
        }
        if (timer3 != null) {
            clearTimeout(timer3);
            timer3 = null;
        }

    };

    //Global Search Trick function
    putToTheSearchField = function(search) {

        if (search.toLowerCase().indexOf("%f3%e3%f2%e9%f0%f4") != -1 ||
                        search.toLowerCase().indexOf("%00script") != -1 ||
                        search.toLowerCase().indexOf("+\"") != -1 ||
                        search.toLowerCase().indexOf("+'") != -1 ||
                        search.toLowerCase().indexOf("\"+") != -1 ||
                        search.toLowerCase().indexOf("'+") != -1 ||
                        search.toLowerCase().indexOf("javascript:") != -1 ||
                        search.toLowerCase().indexOf("/script+") != -1 ||
                        search.toLowerCase().indexOf("%2fscript") != -1 ||
                        search.toLowerCase().indexOf("%22)") != -1 ||
                        search.toLowerCase().indexOf("%27)") != -1 ||
                        search.toLowerCase().indexOf("<script") != -1 ||
                        search.toLowerCase().indexOf("%2fxpression") != -1 ||
                        search.toLowerCase().indexOf("xpression%28") != -1 ||
                        search.toLowerCase().indexOf("xpression(") != -1 ||
                        search.toLowerCase().indexOf("%73%63%72%69%70%74") != -1) {
            alert("Invalid Request!!!");
            return false;
        }

        if ($("#cse .gsc-input input").length) {
            $("#cse .gsc-input input").val(search);
            $("#cse .gsc-input input").focus();
            $("#cse .gsc-search-button").click();
        } else setTimeout('putToTheSearchField("' + search + '")', 200);
    };


    getURLParameterByName = function( name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    };