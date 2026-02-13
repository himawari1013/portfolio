// DOM読み込み完了後
$(function () {
	// 初期カード数を保存（最初の1回だけ）
	const ORIGINAL_CARD_COUNT = $(".items-row .personality-card").length;

	// --------------------------------
	// initHamburgerMenu：ハンバーガーメニュー開閉処理
	// --------------------------------
	function initHamburgerMenu() {
		$(".btn-trigger").on("click", function () {
			$(this).toggleClass("active");
			$(".hamburger-menu").toggleClass("open");
			$("body").toggleClass("menu-open");
		});

		// メニュー内リンク押下時は閉じる
		$(".hamburger-menu a").on("click", function () {
			$(".btn-trigger").removeClass("active");
			$(".hamburger-menu").removeClass("open");
			$("body").removeClass("menu-open");
		});
	}

	// --------------------------------
	// initFadeInAnimation：フェードインアニメーション処理
	// --------------------------------
	function initFadeInAnimation() {
		function fadeInCheck() {
			$(".fade-in").each(function () {
				const elementTop = $(this).offset().top;
				const scroll = $(window).scrollTop();
				const windowHeight = $(window).height();

				if (scroll > elementTop - windowHeight + windowHeight / 5) {
					$(this).addClass("active");
				}
			});
		}

		$(window).on("scroll", fadeInCheck);
		fadeInCheck();
	}

	// --------------------------------
	// initPersonalityCards：プロフィール > PC / モバイル分岐
	// --------------------------------
	function initPersonalityCards() {
		const $row = $(".items-row");
		const isMobile = window.matchMedia("(max-width: 756px)").matches;

		if (isMobile) {
			disablePersonalityLoop($row);
			initPersonalityMobileAnimation();
		} else {
			enablePersonalityLoop($row);
		}
	}

	// --------------------------------
	// disablePersonalityLoop：プロフィール > モバイル用 ループ解除
	// --------------------------------
	function disablePersonalityLoop($row) {
		$row.children(".personality-card").slice(ORIGINAL_CARD_COUNT).remove();

		$row.css("animation", "none");
		$row.removeData("loop-enabled");
	}

	// --------------------------------
	// initPersonalityMobileAnimation：モバイル用 表示アニメーション
	// --------------------------------
	function initPersonalityMobileAnimation() {
		$(".items-row").css("animation", "none");

		$(".personality-card").each(function () {
			$(this).addClass("fade-up-right");
		});

		// scrollを一旦解除してから登録
		$(window).off("scroll", checkPersonalityFadeIn);
		$(window).on("scroll", checkPersonalityFadeIn);
	}

	// --------------------------------
	// checkPersonalityFadeIn：モバイル用 右下からひょこっと表示
	// --------------------------------
	function checkPersonalityFadeIn() {
		$(".fade-up-right").each(function () {
			const elementTop = $(this).offset().top;
			const scroll = $(window).scrollTop();
			const windowHeight = $(window).height();

			if (scroll > elementTop - windowHeight + 100) {
				$(this).addClass("active");
			}
		});
	}

	// --------------------------------
	// setCurrentYear：フッター > 現在の年を取得
	// --------------------------------
	function setCurrentYear() {
		$("#year").text(new Date().getFullYear());
	}

	// --------------------------------
	// 画面回転・リサイズ対応
	// --------------------------------
	// 現在のモード保持
	let isMobileMode = window.matchMedia("(max-width: 756px)").matches;

	// resize処理
	$(window).on("resize", function () {
		const newMode = window.matchMedia("(max-width: 756px)").matches;

		if (newMode !== isMobileMode) {
			isMobileMode = newMode;
			initPersonalityCards();
		}
	});

	// --------------------------------
	// enablePersonalityLoop：カードをループさせる
	// --------------------------------
	function enablePersonalityLoop($row) {
		const $cards = $row.children(".personality-card");
		if ($cards.length === 0) return;

		// 二重実行防止
		if ($row.data("loop-enabled")) return;

		// カードを複製
		$cards.clone().appendTo($row);

		$row.css("animation", "slide-left 30s linear infinite");
		$row.data("loop-enabled", true);
	}

	// --------------------------------
	// initImageZoom：虫眼鏡
	// --------------------------------
	function initImageZoom() {
		$(".zoom-btn-01, .zoom-btn-02").on("click", function () {
			const imgSrc = $(this)
				.siblings(".portfolio-slider")
				.find(".slick-current img")
				.attr("src");

			if (!imgSrc) return;

			$("#image-modal img").attr("src", imgSrc);
			$("#image-modal").addClass("show");
		});

		$("#image-modal").on("click", function () {
			$(this).removeClass("show");
		});
	}

	// ポートフォリオスライダーを初期化
	$(".slick-fade").slick({
		arrows: true,
		dots: true,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: "linear",
	});

	// --------------------------------
	// 初期化処理
	// --------------------------------
	initHamburgerMenu();
	initFadeInAnimation();
	initPersonalityCards();
	initImageZoom();
	setCurrentYear();
});
