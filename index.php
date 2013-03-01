<?php include 'header.php'; ?>


		<?php include 'nav.php'; ?>

		<script type="text/javascript">
		function sendNewSession(){
			if(validateCreateFields()){
				createNewSession($('#newSessionId').val(), $('#redServer').val(), $('#greenServer').val(), $('#blueServer').val())
			}
		}

		function validateCreateFields(){
			return validateField($('#newSessionId'), 'New Session Name', $('#newErrorMessage'), 'alphanum', true, 3, 60) &&
			validateField($('#redServer'), 'Red Server Name', $('#newErrorMessage'), 'alphanum', true, 3, 60) &&
			validateField($('#greenServer'), 'Green Server Name', $('#newErrorMessage'), 'alphanum', true, 3, 60) &&
			validateField($('#blueServer'), 'Blue Server Name', $('#newErrorMessage'), 'alphanum', true, 3, 60)
		}
		</script>


		<div class="bodybg">
			<header class="firstRow">
				<div class="container">
					<div class="span12">
						<h1>Welcome to Guild Wars 2 Camps</h1>
						<h3>Community information sharing for WvWvW supply camps</h3>	
					</div>
				</div>
			</header>

			<div class="container">

				<div class="row-fluid">
					<div class="span12">
						<p><b>How it works</b></p>
						<p>
							GW2 Camps supports community sessions that you can share with your friends.
							<ul>
								<li><b>Either: </b>Create a new session with a unique name to share with your team</li>
								<li><b>Or: </b>Join an existing session that someone else has created</li>
							</ul>
						</p>
					</div>
				</div>

				<div class="row-fluid marginTopRow">
					<div class="span4 greyBG rounded-corners">
						Create new session<br />
						<input id="#newSessionId" placeholder="Session Name" type="text"/><br/>
						<input id="#redServer" placeholder="Red Server" type="text"/><br/>
						<input id="#greenServer" placeholder="Green Server" type="text"/><br/>
						<input id="#blueServer" placeholder="Blue Server" type="text"/><br/>
						<button class="btn btn-primary btn-large">Create</button>
						<div class="span12 errorMessage" id="#newErrorMessage">&nbsp;</div>
					</div>
					<div class="span4 offset1 greyBG rounded-corners">
						Join existing session<br />
						<input id="#existingSessionId" placeholder="Session Name" type="text"/><br/>
						<button class="btn btn-primary btn-large">Join</button>
					</div>
				</div>
				<div class="row-fluid">
					<div class="span12 errorMessage" id="#ajaxMessage">&nbsp;</div>
				</div>

			</div>
		</div>
	<?php include 'footer.php'; ?>

<?php include 'close.php'; ?>