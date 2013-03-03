<?php include 'header.php'; ?>
	<?php include_once("analytics.php") ?>

		<?php include 'nav.php'; ?>

		<script type="text/javascript">
		$(document).ready(function(){
			update()
		})
		function update(){
			getSession(getKey(), $('#sessionUpdateError'), updateSession)
		}

		setInterval(update, 20000)
		</script>


		<div class="bodybg">
			<div class="container">

				<div class="row-fluid firstRow">
					<div class="span12">
						<h2>Session: <span id="sessionName"></span></h2>
						<p>Simply wait until a camp changes colour on the map, and then update it here.</p>
						<p>You can also update camps that have not changed hands, just so everyone knows you're watching</p>
						<p><button onClick="update()" class="btn btn-primary btn-large">Manual Update All</button> &nbsp; Updating also happens automatically every 20 seconds</p>
						<p>Camps marked in <span class="buffed">red</span> have been flipped in the last 5 minutes and will have the supervisor buff (if updated at the same time as flipped)
					</div>
					<div class="span12 errorMessage" id="sessionUpdateError">&nbsp;</div>
				</div>

				<div class="row-fluid">
					<div class="span6 border-info rounded-corners" id="bl-red"></div>
					<div class="span6 border-info rounded-corners" id="bl-green"></div>
				</div>

				<div class="row-fluid marginTopRow">
					<div class="span6 border-info rounded-corners" id="bl-blue"></div>
					<div class="span6 border-info rounded-corners" id="bl-eb"></div>
				</div>
				

			</div>
		</div>
	<?php include 'footer.php'; ?>

<?php include 'close.php'; ?>