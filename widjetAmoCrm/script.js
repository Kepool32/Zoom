define(['jquery'], function($) {
	let CustomWidget = function () {
		let $this = this;

		this.serverResponse = null;

		this.name = 'WidjetSLM';
		this.language = 'ru';


		function sendRequest() {
			return new Promise(function(resolve, reject) {
				let domain = window.AMOCRM.widgets.system.domain;
				$.ajax({
					url: "https://slmaxzoom.outer.cnvl.io/api/zoom/init",
					method: "POST",
					data: { domain: domain },

					success: function(response) {
						resolve(response.code);
					},
					error: function(xhr, status, error) {
						reject(error);

					}
				});
			});

		}
		function sendAddAccountRequest() {
			return new Promise(function(resolve, reject) {
				let domain = window.AMOCRM.widgets.system.domain;
				$.ajax({
					url: "https://slmaxzoom.outer.cnvl.io/api/zoom/accounts/add",
					method: "POST",
					data: { domain: domain },
					success: function(response) {
						resolve(response.auth);
					},
					error: function(xhr, status, error) {
						reject(error);
					}
				});
			});
		}


		function sendShowAccountsRequest() {
			return new Promise(function(resolve, reject) {
				let domain = window.AMOCRM.widgets.system.domain;
				$.ajax({
					url: "https://slmaxzoom.outer.cnvl.io/api/zoom/accounts",
					method: "POST",
					data: { domain: domain },
					success: function(response) {
						resolve(response);
					},
					error: function(xhr, status, error) {
						reject(error);
					}
				});
			});
		}
		function sendDeleteAccountRequest(accountId) {
			return new Promise(function(resolve, reject) {
				let domain = window.AMOCRM.widgets.system.domain;
				let deleteUrl = "https://slmaxzoom.outer.cnvl.io/api/zoom/accounts/" + domain + "/" + accountId;
				$.ajax({
					url: deleteUrl,
					method: "DELETE",
					data: { domain: domain },
					success: function(response) {
						resolve(response);
					},
					error: function(xhr, status, error) {
						reject(error);
					}
				});
			});
		}
		this.callbacks = {
			render: async function() {
				$this.script_url = $this.params.script_url;
				$this.scriptCss_url = $this.params.scriptCss_url;

				try {

					const code = await sendRequest();
					$this.serverResponse = code;

					if ($this.serverResponse === 10) {

						$this.render_template({
							caption: {
								class_name: 'alco_right_side_widget'
							},
							body: '',
							render: `<div id="root"></div><script src="${$this.script_url}"></script>`
						}, {});
					}
					return true;
				} catch (error) {
					console.error("Ошибка при отправке запроса:", error);
					return false;
				}
			},

			init: function() {
				require([

				], function(WidgetClass) {

				});

				$("head").append(`
                    <script src='${$this.script_url}'></script>
                    <link rel="stylesheet" href='${$this.scriptCss_url}'>
                `);
				$("body").append(`
                    <script src='${$this.script_url}'></script>
                `);

				return true;
			},

			bind_actions: function(){
				return true;
			},

			settings: function(){
				return true;
			},

			onSave: function(){
				return true;
			},

			destroy: function(){
			},

			contacts: {
				selected: function(){}
			},

			leads: {
				selected: function(){}
			},

			tasks: {
				selected: function(){}
			},

			advancedSettings: function() {
				var $work_area = $("#work-area-" + $this.get_settings().widget_code);
				var usersVisible = false;
				var deleteUserButton;

				var showConfirmationMessage = function(name, description) {
					// Создание сообщения о подтверждении домена
					var $confirmationMessage = $("<div>").css({
						backgroundColor: "white",
						padding: "20px",
						marginBottom: "20px"
					});

					var $confirmationTitle = $("<h1>").text(name).css({
						fontSize: "24px",
						marginBottom: "10px"
					});

					var $confirmationDescription = $("<p>").text(description).css({
						color: "rgb(0, 0, 0)",
						opacity: 0.7
					});

					$confirmationMessage.append($confirmationTitle, $confirmationDescription);
					return $confirmationMessage;
				};

				var buttonsData = [
					{
						name: "Подтвердить домен",
						description: "Убедитесь, что ваш домен подтвержден для безопасной отправки сообщений.",
						buttonClass: "button1",
						clickHandler: function() {
							sendRequest();
							var $confirmationMessage = showConfirmationMessage("Домен подтвержден", "Ваш домен подтвержден для безопасной отправки сообщений.");
							$(this).text("Домен подтвержден").prop("disabled", true).after($confirmationMessage);
						}
					},
					{
						name: "Добавить аккаунт",
						description: "Создайте новый аккаунт для доступа к сервису или приложению.",
						buttonClass: "add-account-button",
						clickHandler: function() {
							sendAddAccountRequest().then(function(auth) {
								window.open(auth, "_blank");
							}).catch(function(error) {
								console.error("Ошибка при добавлении аккаунта:", error);
							});
						}
					},
					{
						name: "Показать все аккаунты",
						description: "Отобразить или скрыть список всех пользователей для вашего удобства и управления ими.",
						buttonClass: "show-users-button",
						clickHandler: function() {
							if (usersVisible) {
								$work_area.find(".user-list-container").remove();
								usersVisible = false;
								$(this).text("Показать все аккаунты");
							} else {
								loadUserList();
								usersVisible = true;
								$(this).text("Скрыть все аккаунты");
							}
						}
					}
				];

				buttonsData.forEach(function(buttonInfo) {
					var $buttonDiv = $("<div>").css({
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						marginBottom: "20px",
						backgroundColor: "white",
						padding: "20px",
						gap: "10px"
					});

					var $buttonTitle = $("<h1>").text(buttonInfo.name).css({
						fontSize: "24px"
					});

					var $buttonDescription = $("<p>").text(buttonInfo.description).css({
						color: "rgb(0, 0, 0)",
						opacity: 0.7
					});

					var $button = $("<button>").text(buttonInfo.name).addClass(buttonInfo.buttonClass);

					$buttonDiv.append($buttonTitle, $buttonDescription, $button);
					$work_area.append($buttonDiv);

					$button.css({
						backgroundColor: "rgb(37,99,235)",
						color: "rgb(255, 255, 255)",
						padding: "10px 20px",
						border: "none",
						borderRadius: "5px",
						cursor: "pointer",
						transition: "background-color 0.3s ease 0s",
						width: "200px",
						fontSize: "14px"
					});

					$button.on("click", buttonInfo.clickHandler);
				});


				function loadUserList() {
					sendShowAccountsRequest().then(function(response) {
						if (response.accounts && response.accounts.length > 0) {
							var $userListContainer = $("<div>").addClass("user-list-container").css({
								padding: "20px",
								backgroundColor: "#f2f2f2"
							});

							var $deleteUserContainer = $("<div>").addClass("delete-user-container").css({
								margin:"0 20px -10px"
							});

							var deleteUserButton = $("<button>").text("Удалить").addClass("delete-users-button").css({
								fontSize: "14px",
								marginBottom: "10px",
								pointerEvents: "none",
								opacity: 0.7,
								transform: "translateX(40%)"
							});

							var trashIcon = $("<i>").addClass("fa fa-trash").css({
								fontSize: "20px",
								marginRight: "10px"
							});


							function updateDeleteButtonState() {
								var $selectedUsers = $userListContainer.find(".user-table input:checked");
								if ($selectedUsers.length > 0) {
									deleteUserButton.prop("disabled", false).css({
										pointerEvents: "auto",
										opacity: 1
									});
								} else {
									deleteUserButton.prop("disabled", true).css({
										pointerEvents: "none",
										opacity: 0.7
									});
								}
							}

							deleteUserButton.on("click", function() {
								var $selectedUsers = $userListContainer.find(".user-table input:checked");
								var userIds = $selectedUsers.map(function() {
									return $(this).data("user-id");
								}).get();
								if (userIds.length > 0) {
									userIds.forEach(function(userId) {
										sendDeleteAccountRequest(userId).then(function(response) {
											console.log("Пользователь с ID " + userId + " успешно удален.");
										}).catch(function(error) {
											console.error("Ошибка при удалении пользователя с ID " + userId + ":", error);
										});
									});
								} else {
									alert("Выберите пользователей для удаления");
								}
							});

							$deleteUserContainer.append(deleteUserButton.prepend(trashIcon));
							$userListContainer.append($deleteUserContainer);

							var $table = $("<table>").addClass("user-table").css({
								width: "100%",
								borderCollapse: "collapse",
								border: "1px solid #ddd",
								textAlign: "center",
								marginTop: "20px",
								backgroundColor: "white",
							});

							var $thead = $("<thead>").appendTo($table);
							var $tbody = $("<tbody>").appendTo($table);

							var $headRow = $("<tr>").appendTo($thead);
							$("<th>").text("ID").css({
								color: "#333",
								padding: "8px",
								fontWeight: "bold",
								borderBottom: "1px solid #ddd",
								borderRight: "1px solid #ddd",
								width: '5%'
							}).appendTo($headRow);
							$("<th>").text("Email").css({
								color: "#333",
								padding: "15px",
								fontWeight: "bold",
								borderBottom: "1px solid #ddd",
								textAlign: "left"

							}).appendTo($headRow);

							response.accounts.forEach(function(account) {
								var $userRow = $("<tr>").appendTo($tbody);

								var $checkbox = $("<input>").attr({
									type: "checkbox",
									"data-user-id": account.id
								}).css({
									margin: "auto",
									display: "block"
								}).on("change", updateDeleteButtonState);

								var $userIdCell = $("<td>").css({
									padding: "15px",
									borderBottom: "1px solid #ddd",
									borderRight: "1px solid #ddd",
									display: 'flex',
									gap: '30px'
								});

								$userIdCell.append($checkbox, $("<span>").text(account.id).addClass("user-id"));

								var $emailCell = $("<td>").text(account.email).addClass("user-email").css({
									padding: "15px",
									borderBottom: "1px solid #ddd",
									textAlign: "left"

								});

								$userRow.append($userIdCell, $emailCell);
							});

							$userListContainer.append($table);
							$work_area.append($userListContainer);

						} else {
							alert("Список аккаунтов пуст");
						}
					}).catch(function(error) {
						console.error("Ошибка при получении списка аккаунтов:", error);
					});
				}
				return true;
			}
		};

		this.error = function(header, message, wait_time) {
			let $Inbox = $('#popups_inbox'),
				zIndex = $Inbox.css('z-index'),
				t = wait_time || 6000;
			AMOCRM.notifications.show_message_error({
				text: message || '', header: header || ''
			});
			$Inbox.css('z-index', 9001);
			setTimeout(function() {
				$Inbox.css('z-index', zIndex);
			}, t);
		};

		return this;
	};

	return CustomWidget;
});
