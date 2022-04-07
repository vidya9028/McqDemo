<?php

namespace App\Http\Controllers;

use stdClass;
use App\Models\User;
use App\Models\TestResult;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class McqController extends Controller
{
    public function getMcqData()
    {
        $data = [];
        
        $testResult = TestResult::All();
        $data = collect($testResult)->map(function ($test)  {
            $userTestData = new stdClass();
                 $userTestData->id = $test->id;
                 $userTestData->name = $test->user->name;
                 $userTestData->user_id = $test->user->id;
                 $userTestData->score = $test->score;
                 
                 return $userTestData;
        });
        return Inertia::render('AdminDashboard', ['data' => $data]);
    }
    public function setMcqData(Request $request)
    {
        $user_id = Auth::user()->id;
        $score = $request->score;
        $result = TestResult::updateOrCreate(["user_id" => $user_id, "score" => $score]);
        return Inertia::render('UserDashboard', ["data" => "success"]);
    }
}
