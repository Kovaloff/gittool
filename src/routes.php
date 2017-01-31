<?php
// Routes
$shell_output = array();
$path_to_the_repo = exec('git rev-parse --show-toplevel', $shell_output);
$repository = GitTool::open($path_to_the_repo);

$app->get('/', function ($request, $response) {
    global $repository;
    $branches_list = $repository->list_remote_branches();

    foreach ($branches_list as $key => $item) {
        $split = explode("/", $item);
        $branches_list[$key] = $split[1];
    }

    $active_branch = $repository->active_branch();
    $status = $repository->status();

    $response = $this->renderer->render($response, "index.phtml",
        ["remote_branches_list" => $branches_list, "active_branch" => $active_branch, "status" => $status,]);
    return $response;
});

$app->post('/checkout', function ($request, $response) use ($app) {

    global $repository;
    $data = $request->getParsedBody();
    $branch = $data['branch'];

    return json_encode($repository->checkout($branch));
});

$app->post('/pull', function ($request) use ($app) {

    global $repository;

    return json_encode($repository->pull());
});

$app->post('/status', function ($request) use ($app) {

    global $repository;

    return json_encode($repository->status());
});

$app->post('/reset', function ($request) use ($app) {

    global $repository;

    return json_encode($repository->repo_reset());
});

$app->post('/log', function ($request) use ($app) {

    global $repository;

    return json_encode($repository->log('<p><span class="text-danger">%h</span> <span class="text-success">%ad</span> <span class="text-primary">%an</span> <span class="text-muted">%d</span> <span class="text-warning">%s</span></p>',
        false));
});
