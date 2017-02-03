// Make all links open in new tab
$('a').attr('target', '_blank');



// Display jobs from Lever
var $jobsList = $('#jobs-list');
var $main = $('#jobs-main');
var jobs = [];

function displayJob(job, $jobsListItem) {
  $main.empty();

  var $jobTitle = $('<h2>' + job.text + '</h2>');

  $jobTitle.on('click', function () {
    window.location.hash = job.id;
  });

  $main.append($jobTitle);

  $main.append('<a href="' + job.applyUrl + '" class="btn">Apply now</a>');
  $main.append('<div>' + job.description + '</div>');

  job.lists.forEach(function (list) {
    $main.append('<h3>' + list.text + '</h3>');
    $main.append('<ul>' + list.content + '</ul>');
  });

  $main.append('<div>' + job.additional + '</div>');

  $jobsList.find('li').removeClass('active');
  $jobsListItem.addClass('active');
}

$.getJSON('https://api.lever.co/v0/postings/meteor?mode=json', function (data) {
  jobs = data;

  jobs.forEach(function (job, index) {
    var $jobsListItem = $(
      '<li><a href="#" id="link-' + job.id + '">' + job.text + '</a></li>');
    $jobsList.append($jobsListItem);

    $jobsListItem.on('click', function (e) {
      e.preventDefault();
      displayJob(job, $jobsListItem);
    });
  });

  var selectedJob = jobs[0];
  if (window.location.hash) {
    var id = window.location.hash.substr(1);

    var jobWithId = jobs.filter(function (job) { return job.id === id });

    if (jobWithId.length) {
      selectedJob = jobWithId[0];
    }
  }

  displayJob(selectedJob, $('#link-' + selectedJob.id).parent());

  if (window.location.hash) {
    // Only scroll to the job description if we are intentionally linking there
    document.body.scrollTop = $main.offset().top;
  }
});
