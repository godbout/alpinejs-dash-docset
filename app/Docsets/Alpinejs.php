<?php

namespace App\Docsets;

use Godbout\DashDocsetBuilder\Docsets\BaseDocset;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Wa72\HtmlPageDom\HtmlPageCrawler;

class Alpinejs extends BaseDocset
{
    public const CODE = 'alpinejs';
    public const NAME = 'Alpine.js';
    public const URL = 'github.com';
    public const INDEX = 'alpinejs/alpine.html';
    public const PLAYGROUND = 'https://alpinejs.codewithhugo.com/?type=components';
    public const ICON_16 = '../../icons/icon.png';
    public const ICON_32 = '../../icons/icon@2x.png';
    public const EXTERNAL_DOMAINS = [
        'githubassets.com',
    ];


    public function grab(): bool
    {
        $toGet = implode('|', [
            'github\.githubassets\.com/assets/',
        ]);

        system(
            "echo; wget github.com/alpinejs/alpine \
                --mirror \
                --trust-server-names \
                --accept-regex='{$toGet}' \
                --ignore-case \
                --page-requisites \
                --adjust-extension \
                --convert-links \
                --span-hosts \
                --domains={$this->externalDomains()} \
                --directory-prefix=storage/{$this->downloadedDirectory()} \
                -e robots=off \
                --quiet \
                --show-progress",
            $result
        );

        return $result === 0;
    }

    public function entries(string $file): Collection
    {
        $crawler = HtmlPageCrawler::create(Storage::get($file));

        $entries = collect();

        $entries = $entries->merge($this->guideEntries($crawler));
        $entries = $entries->merge($this->sectionEntries($crawler));

        return $entries;
    }

    protected function guideEntries(HtmlPageCrawler $crawler)
    {
        $entries = collect();

        $crawler->filter('.entry-content h2')->each(function (HtmlPageCrawler $node) use ($entries) {
            $entries->push([
                'name' => trim($node->text()),
                'type' => 'Guide',
                'path' => $this->url() . '/alpinejs/' . $node->children('a')->attr('href')
            ]);
        });

        return $entries;
    }

    protected function sectionEntries(HtmlPageCrawler $crawler)
    {
        $entries = collect();

        $crawler->filter('.entry-content h3')->each(function (HtmlPageCrawler $node) use ($entries) {
            $entries->push([
                'name' => trim($node->text()),
                'type' => 'Section',
                'path' => $this->url() . '/alpinejs/' . $node->children('a')->attr('href')
            ]);
        });

        return $entries;
    }

    public function format(string $file): string
    {
        $crawler = HtmlPageCrawler::create(Storage::get($file));

        $this->removeGitHubNavbar($crawler);
        $this->removeRepositoryNavigation($crawler);
        $this->removeSignupPrompt($crawler);
        $this->removeFileNavigation($crawler);
        $this->removeRepositoryDetails($crawler);
        $this->removeRightSidebar($crawler);
        $this->removeWeirdBoxHeader($crawler);
        $this->removeContentBorder($crawler);
        $this->removeVersionSpecificBadges($crawler);

        $this->removeFooter($crawler);

        $this->removeCrossOriginAndIntegrity($crawler);

        $this->insertOnlineRedirection($crawler);
        $this->insertDashTableOfContents($crawler);

        return $crawler->saveHTML();
    }

    protected function removeGitHubNavbar(HtmlPageCrawler $crawler)
    {
        $crawler->filter('.js-header-wrapper')->remove();
    }

    protected function removeRepositoryNavigation(HtmlPageCrawler $crawler)
    {
        $crawler->filter('.bg-gray-light.pt-3.hide-full-screen.mb-5')->remove();
    }

    protected function removeSignupPrompt(HtmlPageCrawler $crawler)
    {
        $crawler->filter('signup-prompt')->remove();
    }

    protected function removeFileNavigation(HtmlPageCrawler $crawler)
    {
        $crawler->filter('.file-navigation')->remove();
    }

    protected function removeRepositoryDetails(HtmlPageCrawler $crawler)
    {
        $crawler->filter('.Box.mb-3')->remove();
    }

    protected function removeRightSidebar(HtmlPageCrawler $crawler)
    {
        $crawler->filter('.flex-shrink-0.col-12.col-md-3')->remove();
    }

    protected function removeWeirdBoxHeader(HtmlPageCrawler $crawler)
    {
        $crawler->filter('.Box-header')->remove();
    }

    protected function removeContentBorder(HtmlPageCrawler $crawler)
    {
        $crawler->filter('#readme')->addClass('border-0 !important');
    }

    protected function removeVersionSpecificBadges(HtmlPageCrawler $crawler)
    {
        $crawler->filter('[alt="npm bundle size"]')->remove();
        $crawler->filter('[alt="npm version"]')->remove();
    }

    protected function removeFooter(HtmlPageCrawler $crawler)
    {
        $crawler->filter('.footer')->remove();
    }

    protected function removeCrossOriginAndIntegrity(HtmlPageCrawler $crawler)
    {
        $crawler->filter('script, link')
            ->removeAttribute('integrity')
            ->removeAttribute('crossorigin');
    }

    protected function insertOnlineRedirection(HtmlPageCrawler $crawler)
    {
        $crawler->filter('html')->prepend("<!-- Online page at https://github.com/alpinejs/alpine -->");
    }

    protected function insertDashTableOfContents(HtmlPageCrawler $crawler)
    {
        $crawler->filter('head')
            ->before('<a name="//apple_ref/cpp/Section/Top" class="dashAnchor"></a>');

        $crawler->filter('h3')->each(function (HtmlPageCrawler $node) {
            $node->prepend(
                '<a id="'
                . Str::slug($node->text())
                . '" name="//apple_ref/cpp/Section/'
                . rawurlencode($node->text())
                . '" class="dashAnchor"></a>'
            );
        });
    }
}
