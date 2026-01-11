// ==================================
// DOM読み込み完了後
// ==================================
$(function () {
	// --------------------------------
	// 初期カード数を保存（最初の1回だけ）
	// --------------------------------
	const ORIGINAL_CARD_COUNT = $(".items-row .personality-card").length;

	// --------------------------------
	// ハンバーガーメニュー開閉処理
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
	// フェードインアニメーション処理
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
	// 全体の司令塔：PC / モバイル分岐
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

	// -----------------------------------------------
	// プロフィール：PC用 カードを増やし、横スクロール有効化
	// -----------------------------------------------
	function enablePersonalityLoop($row, $cards) {
		if ($row.data("loop-enabled")) return;

		$cards.clone().appendTo($row);
		$row.css("animation", "slide-left 30s linear infinite");
		$row.data("loop-enabled", true);
	}

	// --------------------------------
	// プロフィール：モバイル用 ループ解除
	// --------------------------------
	function disablePersonalityLoop($row) {
		$row.children(".personality-card").slice(ORIGINAL_CARD_COUNT).remove();

		$row.css("animation", "none");
		$row.removeData("loop-enabled");
	}

	// --------------------------------
	// モバイル：表示アニメーション
	// --------------------------------
	function initPersonalityMobileAnimation() {
		$(".items-row").css("animation", "none");

		$(".personality-card").each(function () {
			$(this).addClass("fade-up-right");
		});

		$(window).on("scroll", checkPersonalityFadeIn);
		checkPersonalityFadeIn();
	}

	// --------------------------------
	// モバイル：右下からひょこっと表示
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
	// フッター > 現在の年を取得
	// --------------------------------
	function setCurrentYear() {
		$("#year").text(new Date().getFullYear());
	}

	// --------------------------------
	// 初期化処理
	// --------------------------------
	initHamburgerMenu();
	initFadeInAnimation();
	initPersonalityCards();
	setCurrentYear();

	// --------------------------------
	// 画面回転・リサイズ対応
	// --------------------------------
	$(window).on("resize", function () {
		initPersonalityCards();
	});
});
